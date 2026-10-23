const { withAppBuildGradle } = require('expo/config-plugins');

// Signs local release builds with the keystore described in credentials.json
// (same file EAS uses for `credentialsSource: local`). Falls back to the debug
// keystore when credentials.json is missing so dev machines still build.
const CREDENTIALS = "rootProject.file('../credentials.json')";

const RELEASE_SIGNING_CONFIG = `
        release {
            def credsFile = ${CREDENTIALS}
            if (credsFile.exists()) {
                def creds = new groovy.json.JsonSlurper().parse(credsFile).android.keystore
                storeFile rootProject.file("../\${creds.keystorePath}")
                storePassword creds.keystorePassword
                keyAlias creds.keyAlias
                keyPassword creds.keyPassword
            }
        }`;

function applyReleaseSigning(gradle) {
  if (gradle.includes('credentials.json')) return gradle;

  // Add a release signingConfig right after the default debug one.
  gradle = gradle.replace(
    /(signingConfigs\s*\{\s*debug\s*\{[^}]*\})/,
    `$1${RELEASE_SIGNING_CONFIG}`
  );

  // Point the release buildType at it.
  gradle = gradle.replace(
    /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/,
    `$1signingConfig ${CREDENTIALS}.exists() ? signingConfigs.release : signingConfigs.debug`
  );

  return gradle;
}

module.exports = function withReleaseSigning(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = applyReleaseSigning(config.modResults.contents);
    return config;
  });
};
