/*Adapted from https://github.com/sitebase/react-avatar */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const prop_types_1 = __importDefault(require("prop-types"));
const create_react_class_1 = __importDefault(require("create-react-class"));
const md5_1 = __importDefault(require("md5"));
const isRetina = require('is-retina')();
const AvatarImage = create_react_class_1.default({
    displayName: 'AvatarImage',
    getProtocol: function () {
        if (typeof window === 'undefined')
            return 'https:';
        return window.location.protocol;
    },
    shouldComponentUpdate(nextProps, nextState) {
        return !mailspring_exports_1.Utils.isEqualReact(nextProps, this.props) || !mailspring_exports_1.Utils.isEqualReact(nextState, this.state);
    },
    /**
     * Gravatar implementation
     * @param  {string}   email MD5 hash or plain text email address
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGravatarURL: function (email, size, cb, tryNext) {
        var base = 'gravatar.com/avatar/<%=id%>?s=<%=size%>&d=404';
        // if email does not contain @ it's already an MD5 hash
        if (email.indexOf('@') > -1)
            email = md5_1.default(email);
        var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
        size = isRetina ? size * 2 : size;
        cb(prefix + this.parse(base, { id: email, size: size }));
    },
    getClearbitURL: function (email, size, cb, tryNext) {
        var base = "logo.clearbit.com/<%=domain%>";
        var domain;
        if (email.indexOf('@') > -1)
            domain = email.split('@')[1];
        var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
        cb(prefix + this.parse(base, { domain: domain }));
    },
    /**
     * Facebook implementation
     * @param  {string|int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getFacebookURL: function (id, size, cb, tryNext) {
        var base = 'graph.facebook.com/<%=id%>/picture?width=<%=size%>';
        cb(this.getProtocol() + '//' + this.parse(base, { id: id, size: size }));
    },
    /**
     * Google+ implementation
     * @param  {int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGoogleURL: function (id, size, cb, tryNext) {
        var base = 'picasaweb.google.com/data/entry/api/user/<%=id%>?alt=json';
        var url = this.getProtocol() + '//' + this.parse(base, { id: id });
        this.get(url, function (data) {
            var src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + size); // replace with the correct size
            cb(src);
        }, tryNext);
    },
    /**
     * Skype implementation
     * @param  {string}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getSkypeURL: function (id, size, cb, tryNext) {
        var base = 'api.skype.com/users/<%=id%>/profile/avatar';
        cb(this.getProtocol() + '//' + this.parse(base, { id: id }));
    },
    /**
     * Replace variables in a string
     * @param  {string} value String that will be parsed
     * @param  {Object} variables    Key value object
     * @return {string}
     */
    parse: function (value, variables) {
        for (var variable in variables) {
            value = value.replace('<%=' + variable + '%>', variables[variable]);
        }
        return value;
    },
    /**
     * Return a random color
     * @return {string}
     */
    rndColor: function () {
        var colors = ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'];
        var index = Math.floor(Math.random() * colors.length);
        return colors[index];
    },
    /**
     * Convert a name into initials
     * @param {string} name
     * @return {string}
     */
    getInitials: function (name) {
        var parts = name.split(' ');
        var initials = '';
        for (var i = 0; i < parts.length; i++) {
            initials += parts[i].substr(0, 1).toUpperCase();
        }
        return initials;
    },
    /**
     * Do an ajax request to fetch remote data
     * @param  {string}   url
     * @param  {Function} cb
     * @return {void}
     */
    get: function (url, successCb, errorCb) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    successCb(data);
                }
                else {
                    errorCb(request.status);
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    },
    /**
     * Set the src attribute of the image element use to display the avatar
     * @param {string} src
     */
    setSrc: function (src) {
        if (src === null)
            return;
        this.trySetState({ src: src });
    },
    propTypes: {
        className: prop_types_1.default.string,
        fgColor: prop_types_1.default.string,
        color: prop_types_1.default.string,
        name: prop_types_1.default.string,
        value: prop_types_1.default.string,
        email: prop_types_1.default.string,
        facebookId: prop_types_1.default.string,
        googleId: prop_types_1.default.string,
        skypeID: prop_types_1.default.string,
        round: prop_types_1.default.bool,
        size: prop_types_1.default.number
    },
    getInitialState: function () {
        return {
            src: null,
            value: null,
            triedFacebook: false,
            triedGoogle: false,
            triedSkype: false,
            triedGravatar: false,
            triedClearbit: false,
        };
    },
    getDefaultProps: function () {
        return {
            fgColor: '#FFF',
            color: null,
            name: null,
            value: null,
            email: null,
            facebookId: null,
            skypeId: null,
            googleId: null,
            round: false,
            size: 32
        };
    },
    // componentWillMount: function() {
    //   this.fetch();
    // },
    componentDidMount: function () {
        this.fetch();
    },
    componentWillReceiveProps: function (newProps) {
        /**
         * This component ignores changes in `this.props.src`, `this.props.name`, and
         * `this.props.value`. This lifecycle method will allow users to change the avatars name or
         * value.
         */
        if (newProps.src && newProps.src !== this.props.src) {
            this.trySetState({ src: newProps.src });
        }
        else if (newProps.name && newProps.name !== this.props.name) {
            this.trySetState({ value: this.getInitials(newProps.name) });
        }
        else if (newProps.value && newProps.value !== this.props.value) {
            this.trySetState({ value: newProps.value });
        }
    },
    trySetState: function (hash) {
        if (this.isMounted()) { //bad antipattern
            this.setState(hash);
        }
    },
    fetch: function (e) {
        var url = null;
        var self = this;
        var tryNext = function () {
            self.fetch();
        };
        // If fetch was triggered by img onError
        // then set state src back to null so getVisual will
        // automatically switch to drawn avatar if there is no other social ID available to try
        if (e && e.type === "error") {
            this.state.src = null;
        }
        if (this.state.triedFacebook === false && !this.state.url && this.props.facebookId) {
            this.state.triedFacebook = true;
            this.getFacebookURL(this.props.facebookId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedGoogle === false && !this.state.url && this.props.googleId) {
            this.state.triedGoogle = true;
            this.getGoogleURL(this.props.googleId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedSkype === false && !this.state.url && this.props.skypeId) {
            this.state.triedSkype = true;
            this.getSkypeURL(this.props.skypeId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedGravatar === false && !this.state.url && this.props.email) {
            this.state.triedGravatar = true;
            this.getGravatarURL(this.props.email, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedClearbit === false && !this.state.url && this.props.email) {
            this.state.triedClearbit = true;
            this.getClearbitURL(this.props.email, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.src)
            return;
        if (this.props.name)
            this.trySetState({ value: this.getInitials(this.props.name) });
        if (!this.props.name && this.props.value)
            this.trySetState({ value: this.props.value });
        if (url === null && this.props.src) {
            this.setSrc(this.parse(this.props.src, { size: this.props.size }));
            return;
        }
    },
    getVisual: function () {
        var imageStyle = {
            maxWidth: '100%',
            width: this.props.size,
            height: this.props.size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        var initialsStyle = {
            background: this.props.color || this.rndColor(),
            width: this.props.size,
            height: this.props.size,
            font: Math.floor(this.props.size / 3) + 'px/100px',
            color: this.props.fgColor,
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: (this.props.size + Math.floor(this.props.size / 10)) + 'px',
            borderRadius: (this.props.round ? 500 : 0)
        };
        if (this.state.src) {
            return (
            /* jshint ignore:start */
            mailspring_exports_1.React.createElement("img", { width: this.props.size, height: this.props.size, style: imageStyle, src: this.state.src, onError: this.fetch })
            /* jshint ignore:end */
            );
        }
        else {
            return (
            /* jshint ignore:start */
            mailspring_exports_1.React.createElement("div", { style: initialsStyle }, this.state.value)
            /* jshint ignore:end */
            );
        }
    },
    render: function () {
        var hostStyle = {
            display: 'inline-block',
            width: this.props.size,
            height: this.props.size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        var visual = this.getVisual();
        return (
        /* jshint ignore:start */
        mailspring_exports_1.React.createElement("div", { className: this.props.className, style: hostStyle }, visual)
        /* jshint ignore:end */
        );
    }
});
module.exports = AvatarImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWltYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F2YXRhci1pbWFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBRTFELFlBQVksQ0FBQzs7Ozs7QUFDYiwyREFBZ0Q7QUFDaEQsNERBQW1DO0FBQ25DLDRFQUFrRDtBQUNsRCw4Q0FBc0I7QUFDdEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7QUFFeEMsTUFBTSxXQUFXLEdBQUcsNEJBQWdCLENBQUM7SUFDakMsV0FBVyxFQUFFLGFBQWE7SUFDMUIsV0FBVyxFQUFFO1FBRVQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXO1lBQzdCLE9BQU8sUUFBUSxDQUFDO1FBRXBCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLFNBQVMsRUFBRSxTQUFTO1FBQ3RDLE9BQU8sQ0FBQywwQkFBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMEJBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsY0FBYyxFQUFFLFVBQVMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTztRQUU3QyxJQUFJLElBQUksR0FBRywrQ0FBK0MsQ0FBQztRQUUzRCx1REFBdUQ7UUFDdkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixLQUFLLEdBQUcsYUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxT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