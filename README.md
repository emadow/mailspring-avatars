## Avatars for Mailspring

Simple, naive implementation of Avatars in the Message List.<br>
Add avatar before each email you receive, no more, no less !<br>
No caching, might do a lot of image requests.

Fork of [emadow](https://github.com/emadow/mailspring-avatars) project, thanks for his work !<br>

![Screenshot](screenshot.png)

## Installing

1. [Grab the latest release](https://github.com/Striffly/mailspring-avatars/releases)
2. Extract Mailspring-Avatars and load Mailspring
3. From the menu, select `Developer > Install a Package Manually...` from the dialog, choose the directory of this plugin to install it


## Contribute

This plugin implements a Typescript builder as required since Maispring 1.6.3 (see https://github.com/Foundry376/Mailspring/issues/1645).

Once you have finish your edits in the `src` folder, compile with `yarn build`.
