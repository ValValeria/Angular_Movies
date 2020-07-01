/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main_server/mainEntry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main_server/errors/errors.ts":
/*!**************************************!*\
  !*** ./main_server/errors/errors.ts ***!
  \**************************************/
/*! exports provided: Errors, UserExists, FileError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Errors\", function() { return Errors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserExists\", function() { return UserExists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FileError\", function() { return FileError; });\nvar Errors;\r\n(function (Errors) {\r\n    Errors[\"UserExists\"] = \"UserExists\";\r\n    Errors[\"FileError\"] = \"FileError\";\r\n})(Errors || (Errors = {}));\r\nclass UserExists extends Error {\r\n    constructor(...args) {\r\n        super(args);\r\n        this.name = Errors.UserExists;\r\n    }\r\n}\r\nclass FileError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n        this.name = Errors.FileError;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/errors/errors.ts?");

/***/ }),

/***/ "./main_server/functions/function.ts":
/*!*******************************************!*\
  !*** ./main_server/functions/function.ts ***!
  \*******************************************/
/*! exports provided: handleError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleError\", function() { return handleError; });\nfunction handleError(resp, obj, next) {\r\n    let response = { status: 'guest', errors: [], messages: [] };\r\n    return obj.catch((error) => {\r\n        if (next)\r\n            return next();\r\n        response.errors.push(error.message);\r\n        resp.json(response);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/functions/function.ts?");

/***/ }),

/***/ "./main_server/handler/mongodb/connect.handler.ts":
/*!********************************************************!*\
  !*** ./main_server/handler/mongodb/connect.handler.ts ***!
  \********************************************************/
/*! exports provided: AuthHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthHandler\", function() { return auth; });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options */ \"./main_server/handler/mongodb/options.ts\");\n\r\n\r\nclass Connect {\r\n    constructor() {\r\n        mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect(_options__WEBPACK_IMPORTED_MODULE_1__[\"url\"], { useNewUrlParser: true });\r\n        this.scheme = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema;\r\n        this.connect();\r\n    }\r\n    connect() {\r\n        const scheme = new this.scheme({\r\n            email: {\r\n                type: String,\r\n                required: true,\r\n                minlength: 10,\r\n                maxlength: 20\r\n            },\r\n            password: {\r\n                type: String,\r\n            },\r\n            posts: [{\r\n                    id_p: this.scheme.ObjectId,\r\n                    title: {\r\n                        type: String,\r\n                        required: true,\r\n                        minlength: 10,\r\n                        maxlength: 20\r\n                    },\r\n                    videoUrl: {\r\n                        type: String,\r\n                    },\r\n                }]\r\n        });\r\n        this.User = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('user', scheme);\r\n    }\r\n}\r\nconst auth = new Connect();\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/handler/mongodb/connect.handler.ts?");

/***/ }),

/***/ "./main_server/handler/mongodb/options.ts":
/*!************************************************!*\
  !*** ./main_server/handler/mongodb/options.ts ***!
  \************************************************/
/*! exports provided: url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"url\", function() { return url; });\nconst url = `mongodb+srv://users:jdjjdjjadjdff@cluster0.xu0mj.mongodb.net/users?retryWrites=true&w=majority`;\r\n\n\n//# sourceURL=webpack:///./main_server/handler/mongodb/options.ts?");

/***/ }),

/***/ "./main_server/handler/url/auth.ts":
/*!*****************************************!*\
  !*** ./main_server/handler/url/auth.ts ***!
  \*****************************************/
/*! exports provided: Auth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Auth\", function() { return Auth; });\n/* harmony import */ var _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mongodb/connect.handler */ \"./main_server/handler/mongodb/connect.handler.ts\");\n/* harmony import */ var _validator_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validator/validator */ \"./main_server/handler/validator/validator.ts\");\n/* harmony import */ var _validator_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validator/constants */ \"./main_server/handler/validator/constants.ts\");\n/* harmony import */ var _errors_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../errors/errors */ \"./main_server/errors/errors.ts\");\n/* harmony import */ var _mainresponse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mainresponse */ \"./main_server/mainresponse.ts\");\n/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./file */ \"./main_server/handler/url/file.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Auth extends _file__WEBPACK_IMPORTED_MODULE_5__[\"FileHandler\"] {\r\n    isUser(obj) {\r\n        return obj.email && obj.password;\r\n    }\r\n    async signup(req, res) {\r\n        const data = req.body;\r\n        if (this.isUser(data)) {\r\n            const user = new _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_0__[\"AuthHandler\"].User({\r\n                email: data.email,\r\n                password: data.password\r\n            });\r\n            await user.save();\r\n            this.response.status = \"user\";\r\n            this.response.messages.push('Вы успешно зарегестрировались');\r\n        }\r\n        return res.json(this.response);\r\n    }\r\n    authenticate(req, res, next) {\r\n        return new Promise((resolve, reject) => {\r\n            let auth = JSON.parse(req.get('Auth'));\r\n            _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_0__[\"AuthHandler\"].User.findOne({ email: auth.email, password: auth.password }, (error, data) => {\r\n                if (error) {\r\n                    reject(error);\r\n                }\r\n                if (data) {\r\n                    _mainresponse__WEBPACK_IMPORTED_MODULE_4__[\"data_auth\"].user.email = data.email;\r\n                    _mainresponse__WEBPACK_IMPORTED_MODULE_4__[\"data_auth\"].user.password = data.password;\r\n                    _mainresponse__WEBPACK_IMPORTED_MODULE_4__[\"data_auth\"].user._id = data._id;\r\n                    _mainresponse__WEBPACK_IMPORTED_MODULE_4__[\"data_auth\"].user.isAuth = true;\r\n                }\r\n                resolve();\r\n                next();\r\n            });\r\n        });\r\n    }\r\n    async emailExists(req, res) {\r\n        const email = req.params.email;\r\n        try {\r\n            _validator_validator__WEBPACK_IMPORTED_MODULE_1__[\"eventEmmit\"].emit(_validator_constants__WEBPACK_IMPORTED_MODULE_2__[\"USER_EMAIL_EXISTS\"], email);\r\n        }\r\n        catch (e) {\r\n            if (e instanceof _errors_errors__WEBPACK_IMPORTED_MODULE_3__[\"UserExists\"]) {\r\n                this.response.status = \"user\";\r\n            }\r\n        }\r\n        return res.json(this.response);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/handler/url/auth.ts?");

/***/ }),

/***/ "./main_server/handler/url/file.ts":
/*!*****************************************!*\
  !*** ./main_server/handler/url/file.ts ***!
  \*****************************************/
/*! exports provided: FileHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FileHandler\", function() { return FileHandler; });\n/* harmony import */ var _mainresponse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mainresponse */ \"./main_server/mainresponse.ts\");\n/* harmony import */ var _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mongodb/connect.handler */ \"./main_server/handler/mongodb/connect.handler.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _errors_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../errors/errors */ \"./main_server/errors/errors.ts\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\nclass FileHandler {\r\n    async addPost(req, res) {\r\n        let { title } = req.body;\r\n        let file = req.file;\r\n        if (!_mainresponse__WEBPACK_IMPORTED_MODULE_0__[\"data_auth\"].user.isAuth || !title || !file)\r\n            throw new Error('Not authenticated or one of the field is missing');\r\n        let filehandle1 = Object.create(FileHandler.prototype);\r\n        try {\r\n            filehandle1 = await fs_promises__WEBPACK_IMPORTED_MODULE_4___default.a.open(file.path, 'r');\r\n            let stat = await filehandle1.stat();\r\n            let exten = path__WEBPACK_IMPORTED_MODULE_2___default.a.extname(req.file.filename).slice(1);\r\n            if (stat.isFile() && exten.includes('mp4')) {\r\n                let public_location = path__WEBPACK_IMPORTED_MODULE_2___default.a.join('public', req.file.filename);\r\n                return new Promise((resolve, reject) => {\r\n                    _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_1__[\"AuthHandler\"].User.findByIdAndUpdate({ _id: _mainresponse__WEBPACK_IMPORTED_MODULE_0__[\"data_auth\"].user._id }, { $push: { posts: {\r\n                                title: title,\r\n                                videoUrl: public_location\r\n                            } } }, (error, _docs) => {\r\n                        if (error)\r\n                            return reject(error);\r\n                        this.response.status = 'added';\r\n                        return resolve(res.json(this.response));\r\n                    });\r\n                });\r\n            }\r\n            else {\r\n                await fs_promises__WEBPACK_IMPORTED_MODULE_4___default.a.unlink(file.path);\r\n                throw new _errors_errors__WEBPACK_IMPORTED_MODULE_3__[\"FileError\"]('Invalid file extension or file size');\r\n            }\r\n        }\r\n        finally {\r\n            if (filehandle1 !== undefined)\r\n                await filehandle1.close();\r\n        }\r\n    }\r\n    async posts(_req, res) {\r\n        return new Promise((resolve, reject) => {\r\n            _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_1__[\"AuthHandler\"].User.find({}, { limit: 4, select: 'posts' }, (err, docs) => {\r\n                let response_array = [];\r\n                if (err)\r\n                    reject(err);\r\n                docs.filter(value => value).forEach((elem) => {\r\n                    response_array = response_array.concat(elem.posts);\r\n                });\r\n                return resolve(res.json(response_array));\r\n            });\r\n        });\r\n    }\r\n    async post(req, res) {\r\n        let title = decodeURI(req.params.title);\r\n        return new Promise((resolve, reject) => {\r\n            _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_1__[\"AuthHandler\"].User.findOne({ posts: { $elemMatch: { title: title }, $slice: 2 } }, 'posts', (err, doc) => {\r\n                if (err || !doc)\r\n                    return reject(err);\r\n                let post = doc.posts[0];\r\n                resolve(res.json(post));\r\n            });\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/handler/url/file.ts?");

/***/ }),

/***/ "./main_server/handler/url/handler.ts":
/*!********************************************!*\
  !*** ./main_server/handler/url/handler.ts ***!
  \********************************************/
/*! exports provided: Handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Handler\", function() { return Handler; });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ \"./main_server/handler/url/auth.ts\");\n/* harmony import */ var _mainresponse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mainresponse */ \"./main_server/mainresponse.ts\");\n\r\n\r\nclass Handler extends _auth__WEBPACK_IMPORTED_MODULE_0__[\"Auth\"] {\r\n    constructor() {\r\n        super();\r\n        this.response = {\r\n            messages: [], status: 'guest', errors: []\r\n        };\r\n    }\r\n    async is_user(req, res) {\r\n        if (_mainresponse__WEBPACK_IMPORTED_MODULE_1__[\"data_auth\"].user.isAuth) {\r\n            this.response.status = \"user\";\r\n            this.response.messages.push(JSON.stringify({ _id: _mainresponse__WEBPACK_IMPORTED_MODULE_1__[\"data_auth\"].user._id }));\r\n        }\r\n        return res.json(this.response);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/handler/url/handler.ts?");

/***/ }),

/***/ "./main_server/handler/validator/constants.ts":
/*!****************************************************!*\
  !*** ./main_server/handler/validator/constants.ts ***!
  \****************************************************/
/*! exports provided: USER_EMAIL_EXISTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USER_EMAIL_EXISTS\", function() { return USER_EMAIL_EXISTS; });\nconst USER_EMAIL_EXISTS = Symbol(\"USER_EMAIL_EXISTS\");\r\n\n\n//# sourceURL=webpack:///./main_server/handler/validator/constants.ts?");

/***/ }),

/***/ "./main_server/handler/validator/validator.ts":
/*!****************************************************!*\
  !*** ./main_server/handler/validator/validator.ts ***!
  \****************************************************/
/*! exports provided: eventEmmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eventEmmit\", function() { return eventEmmit; });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"events\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./main_server/handler/validator/constants.ts\");\n/* harmony import */ var _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mongodb/connect.handler */ \"./main_server/handler/mongodb/connect.handler.ts\");\n/* harmony import */ var _errors_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../errors/errors */ \"./main_server/errors/errors.ts\");\n\r\n\r\n\r\n\r\nconst eventEmmit = new events__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"]();\r\neventEmmit.on(_constants__WEBPACK_IMPORTED_MODULE_1__[\"USER_EMAIL_EXISTS\"], (data, resolve) => {\r\n    _mongodb_connect_handler__WEBPACK_IMPORTED_MODULE_2__[\"AuthHandler\"].User.find({ email: data.email }, (err, docs) => {\r\n        if (docs.length) {\r\n            throw new _errors_errors__WEBPACK_IMPORTED_MODULE_3__[\"UserExists\"]();\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./main_server/handler/validator/validator.ts?");

/***/ }),

/***/ "./main_server/mainEntry.ts":
/*!**********************************!*\
  !*** ./main_server/mainEntry.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! multer */ \"multer\");\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _functions_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/function */ \"./main_server/functions/function.ts\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handler/url/handler */ \"./main_server/handler/url/handler.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\r\nconst server = http__WEBPACK_IMPORTED_MODULE_4___default.a.createServer(app);\r\nconst bodyparser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst publicpath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(__dirname), 'try', 'public');\r\nconst upload = multer__WEBPACK_IMPORTED_MODULE_2___default()({\r\n    storage: multer__WEBPACK_IMPORTED_MODULE_2___default.a.diskStorage({\r\n        destination: function (_req, _file, cb) {\r\n            cb(null, publicpath);\r\n        },\r\n        filename: function (_req, file, cb) {\r\n            cb(null, Math.round(Math.random()) + file.originalname);\r\n        }\r\n    })\r\n});\r\napp.use(cors());\r\napp.use(bodyparser.json());\r\napp.use(bodyparser.urlencoded({ extended: true }));\r\napp.use((req, resp, next) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().authenticate(req, resp, next), next);\r\n});\r\napp.post('/adduser', (req, resp) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().signup(req, resp));\r\n});\r\napp.get('/posts', (req, resp) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().posts(req, resp));\r\n});\r\napp.get('/post/:title', (req, resp) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().post(req, resp));\r\n});\r\napp.post('/addpost', upload.single('videoUrl'), (req, resp) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().addPost(req, resp));\r\n});\r\napp.get('/is_user', (req, res) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(res, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().is_user(req, res));\r\n});\r\napp.get('/email_exists', (req, resp) => {\r\n    Object(_functions_function__WEBPACK_IMPORTED_MODULE_3__[\"handleError\"])(resp, new _handler_url_handler__WEBPACK_IMPORTED_MODULE_5__[\"Handler\"]().emailExists(req, resp));\r\n});\r\nserver.listen(8000, () => {\r\n    console.log('app is running');\r\n});\r\n\n\n//# sourceURL=webpack:///./main_server/mainEntry.ts?");

/***/ }),

/***/ "./main_server/mainresponse.ts":
/*!*************************************!*\
  !*** ./main_server/mainresponse.ts ***!
  \*************************************/
/*! exports provided: data_auth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data_auth\", function() { return data_auth; });\nlet data_auth = Object.seal({\r\n    user: {\r\n        email: '',\r\n        password: '',\r\n        isAuth: false,\r\n        id: null\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack:///./main_server/mainresponse.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs/promises":
/*!*****************************************!*\
  !*** external "require('fs').promises" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('fs').promises;\n\n//# sourceURL=webpack:///external_%22require('fs').promises%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });