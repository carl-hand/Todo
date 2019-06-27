import blacklist from 'metro-config/src/defaults/blacklist';

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

export const resolver = {
  blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
};
