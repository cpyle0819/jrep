# Usage
```sh
jrep replace <key> <glob> -t <text>
```
# Example
This would replace the value at the json path
`accessibility.general.backButton` with the value provided
to the `t` option 'go back' for all files that match the
glob.
```sh
jrep replace 'accessibility.general.backButton' 'src/assets/i18n/*.json' -t 'go back'
```