import {
  addProjectConfiguration,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  joinPathFragments,
  updateJson,
  formatFiles,
} from '@nrwl/devkit';
import { addPackageWithInit } from '@nrwl/workspace';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { AppGeneratorSchema } from './schema';
import {
  VSCodeExtensionsFilePath,
  recommendedExtensions,
  ProjectDependencies,
  ProjectDevDependencies,
} from '../../defaults';
import { updateDependencies } from '../../utils';

interface NormalizedSchema extends AppGeneratorSchema {
  projectName: string;
  projectTitle: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: AppGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? names(options.directory).fileName
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectTitle = options.title ?? projectName;
  const projectRoot = joinPathFragments(
    getWorkspaceLayout(host).appsDir,
    projectDirectory
  );
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectTitle,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // Hack for copying dotfiles - use as a template in the filename
    // e.g. "__dot__eslintrc.js" => ".eslintrc.js"
    dot: '.',
    template: '',
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

function updateExtensionRecommendations(host: Tree) {
  if (!host.exists(VSCodeExtensionsFilePath)) {
    host.write(VSCodeExtensionsFilePath, '{ "recommendations": [] }');
  }

  updateJson(host, VSCodeExtensionsFilePath, (json) => {
    json.recommendations ??= [];
    for (const extension of recommendedExtensions) {
      if (
        Array.isArray(json.recommendations) &&
        !json.recommendations.includes(extension)
      )
        json.recommendations.push(extension);
    }
    return json;
  });
}

export default async function (host: Tree, options: AppGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  const { projectRoot } = normalizedOptions;

  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(projectRoot, 'src'),
    targets: {
      test: {
        executor: 'nx-hardhat:test',
        outputs: [joinPathFragments('coverage', projectRoot)],
      },
      lint: {
        executor: 'nx-hardhat:lint',
      },
      format: {
        executor: 'nx-hardhat:format',
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  const depsTask = updateDependencies(
    host,
    ProjectDependencies,
    ProjectDevDependencies
  );

  addFiles(host, normalizedOptions);

  updateExtensionRecommendations(host);

  addPackageWithInit('@nrwl/jest');
  await formatFiles(host);

  return runTasksInSerial(depsTask);
}
