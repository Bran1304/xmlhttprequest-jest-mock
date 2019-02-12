set -e

version=$(node ./scripts/version.js)

read -p "release version ${version}? [y/n]" -n 1 -r reply
echo

if [[ $reply =~ ^[yY]$ ]]
then
  npm run build
  npm run test
  
  git add -A
  git commit -m "v${version}"
  git tag -a v${version} -m "v${version}" 
  git push origin master --tags

  npm publish
else
  echo "operation cancelled"
fi
