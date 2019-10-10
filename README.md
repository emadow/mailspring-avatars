## Avatars for Mailspring

Simple, naive implementation of Avatars in the Message List.
No caching, might do a lot of image requests.

This was adapted from N1-avatars https://github.com/unity/n1-avatars. Thank you @unity for the work!

![Screenshot](screenshot.png)

## Installing

2. [Grab the latest release](https://github.com/Striffly/mailspring-avatars/releases)
3. Extract Mailspring-Avatars and load Mailspring
4. From the menu, select `Developer > Install a Package Manually...` from the dialog, choose the directory of this plugin to install it


## Contribute

This plugin implements a Typescript builder as required since Maispring 1.6.3 (see https://github.com/Foundry376/Mailspring/issues/1645).

Once you have finish your edits in the `src` folder, compile with `yarn build`.