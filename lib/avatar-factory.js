"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avatar_image_1 = __importDefault(require("./avatar-image"));
const mailspring_exports_1 = require("mailspring-exports");
function default_1(size, name) {
    const Avatar = (props) => {
        const { thread = {} } = props;
        const { participants = [] } = thread;
        if (!participants.length)
            return mailspring_exports_1.React.createElement("noscript", null);
        let participant = participants[participants.length - 1];
        if (participant.isMe() && participants.length > 1) {
            participant = participants[participants.length - 2];
        }
        if (!participant)
            return mailspring_exports_1.React.createElement("noscript", null);
        return mailspring_exports_1.React.createElement(avatar_image_1.default, { email: participant.email, name: participant.name, className: 'thread-avatar', size: size, round: true });
    };
    Avatar.displayName = name;
    return Avatar;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXZhdGFyLWZhY3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBQ3pDLDJEQUEyQztBQUUzQyxtQkFBd0IsSUFBSSxFQUFFLElBQUk7SUFDaEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUMsRUFBRTtRQUN0QixNQUFNLEVBQUUsTUFBTSxHQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM1QixNQUFNLEVBQUUsWUFBWSxHQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFHLENBQUMsWUFBWSxDQUFDLE1BQU07WUFBRSxPQUFPLDBEQUFXLENBQUM7UUFFNUMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7WUFDL0MsV0FBVyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBRyxDQUFDLFdBQVc7WUFBRSxPQUFPLDBEQUFXLENBQUM7UUFDcEMsT0FBTyx5Q0FBQyxzQkFBVyxJQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxlQUFlLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUE7SUFDNUgsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUM7SUFDeEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWpCRCw0QkFpQkMifQ==