"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const avatar_factory_1 = __importDefault(require("./avatar-factory"));
const SmallAvatar = avatar_factory_1.default(32, 'SmallAvatar');
const LargeAvatar = avatar_factory_1.default(42, 'LargeAvatar');
// Activate is called when the package is loaded. If your package previously
// saved state using `serialize` it is provided.
//
function activate() {
    mailspring_exports_1.ComponentRegistry.register(SmallAvatar, { role: 'ThreadListIcon' });
    // See `thread-list-columns.cjsx#L132` -> In Narrow mode, Icons are limited to 1 because of UI issue. Hack around and use MailLabel for larger size
    mailspring_exports_1.ComponentRegistry.register(LargeAvatar, { role: 'Thread:MailLabel' });
}
exports.activate = activate;
// Serialize is called when your package is about to be unmounted.
// You can return a state object that will be passed back to your package
// when it is re-activated.
//
function serialize() {
}
exports.serialize = serialize;
// This **optional** method is called when the window is shutting down,
// or when your package is being updated or disabled. If your package is
// watching any files, holding external resources, providing commands or
// subscribing to events, release them here.
//
function deactivate() {
    mailspring_exports_1.ComponentRegistry.unregister(SmallAvatar);
    // ComponentRegistry.unregister(LargeAvatar)
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQXVEO0FBQ3ZELHNFQUE2QztBQUU3QyxNQUFNLFdBQVcsR0FBRyx3QkFBYSxDQUFDLEVBQUUsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyx3QkFBYSxDQUFDLEVBQUUsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUVwRCw0RUFBNEU7QUFDNUUsZ0RBQWdEO0FBQ2hELEVBQUU7QUFDRixTQUFnQixRQUFRO0lBQ3RCLHNDQUFpQixDQUFDLFFBQVEsQ0FBRSxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLG1KQUFtSjtJQUNuSixzQ0FBaUIsQ0FBQyxRQUFRLENBQUUsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBSkQsNEJBSUM7QUFFRCxrRUFBa0U7QUFDbEUseUVBQXlFO0FBQ3pFLDJCQUEyQjtBQUMzQixFQUFFO0FBQ0YsU0FBZ0IsU0FBUztBQUN6QixDQUFDO0FBREQsOEJBQ0M7QUFFRCx1RUFBdUU7QUFDdkUsd0VBQXdFO0FBQ3hFLHdFQUF3RTtBQUN4RSw0Q0FBNEM7QUFDNUMsRUFBRTtBQUNGLFNBQWdCLFVBQVU7SUFDeEIsc0NBQWlCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3pDLDRDQUE0QztBQUM5QyxDQUFDO0FBSEQsZ0NBR0MifQ==