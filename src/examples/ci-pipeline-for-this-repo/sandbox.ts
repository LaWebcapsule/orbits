import semanticRelease from "semantic-release" ;

semanticRelease({
    // Core options
    branches: [
      "main",
      "git-actions"
    ],
    dryRun: true,
    debug: true,
    "extends": "semantic-release-monorepo",
    repositoryUrl: "git@github.com:LaWebcapsule/orbits-fork.git",
}).then((result)=>{
    console.log(result)
})