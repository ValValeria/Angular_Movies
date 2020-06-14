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

/***/ "./main_server/functions/functions.ts":
/*!********************************************!*\
  !*** ./main_server/functions/functions.ts ***!
  \********************************************/
/*! exports provided: c */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return c; });\nfunction c(promise, res) {\r\n    return promise.catch(err => res.status(500));\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/functions/functions.ts?");

/***/ }),

/***/ "./main_server/mainEntry.ts":
/*!**********************************!*\
  !*** ./main_server/mainEntry.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server_mod/routes_handlers/handle */ \"./main_server/server_mod/routes_handlers/handle.ts\");\n/* harmony import */ var _functions_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/functions */ \"./main_server/functions/functions.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst app = express();\r\nconst bodyparser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst publicpath = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(path__WEBPACK_IMPORTED_MODULE_2___default.a.dirname(__dirname), 'try', 'public');\r\nconst multer = __webpack_require__(/*! multer */ \"multer\");\r\nconst upload = multer({\r\n    storage: multer.diskStorage({\r\n        destination: function (_req, _file, cb) {\r\n            cb(null, publicpath);\r\n        },\r\n        filename: function (_req, file, cb) {\r\n            cb(null, Math.round(Math.random()) + file.originalname);\r\n        }\r\n    })\r\n});\r\napp.use(bodyparser.json());\r\napp.use(bodyparser.urlencoded({ extended: true }));\r\napp.use((req, resp, next) => {\r\n    _server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].status_of_user(req, resp, next);\r\n});\r\napp.post('/addpost', upload.single('videoUrl'), (req, res) => {\r\n    Object(_functions_functions__WEBPACK_IMPORTED_MODULE_1__[\"c\"])(_server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].uploadPost(req, res), res);\r\n});\r\napp.use('/public/:filename', (req, resp, next) => {\r\n    _server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].getFile(req, resp, next);\r\n});\r\napp.post('/users', (req, resp, next) => {\r\n    _server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].addUser(req, resp, next);\r\n});\r\napp.post('/status_of_user', (_req, res, _next) => {\r\n    res.json(_server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].userdata());\r\n});\r\napp.get('/channels', (_req, res, _next) => {\r\n    Object(_functions_functions__WEBPACK_IMPORTED_MODULE_1__[\"c\"])(_server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].channels(_req, res, _next), res);\r\n});\r\napp.get('/posts', (req, res, next) => {\r\n    Object(_functions_functions__WEBPACK_IMPORTED_MODULE_1__[\"c\"])(_server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].posts(req, res, next), res);\r\n});\r\napp.get('/post', (req, res, next) => {\r\n    Object(_functions_functions__WEBPACK_IMPORTED_MODULE_1__[\"c\"])(_server_mod_routes_handlers_handle__WEBPACK_IMPORTED_MODULE_0__[\"newH\"].post(req, res, next), res);\r\n});\r\napp.listen(8000, () => {\r\n    console.log('app is running');\r\n});\r\n\n\n//# sourceURL=webpack:///./main_server/mainEntry.ts?");

/***/ }),

/***/ "./main_server/server_mod/data/data.user.ts":
/*!**************************************************!*\
  !*** ./main_server/server_mod/data/data.user.ts ***!
  \**************************************************/
/*! exports provided: AuthUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthUser\", function() { return auth; });\n/* harmony import */ var _models_tables_Models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/tables/Models */ \"./main_server/server_mod/models/tables/Models.ts\");\n\r\nconst auth = {\r\n    user: new _models_tables_Models__WEBPACK_IMPORTED_MODULE_0__[\"User1\"]({}),\r\n    async change(obj) {\r\n        this.user = new _models_tables_Models__WEBPACK_IMPORTED_MODULE_0__[\"User1\"](obj);\r\n        return this.user;\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/data/data.user.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/nameofmodels.ts":
/*!*******************************************************!*\
  !*** ./main_server/server_mod/models/nameofmodels.ts ***!
  \*******************************************************/
/*! exports provided: ModelNames, obj1, confingD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ModelNames\", function() { return ModelNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"obj1\", function() { return obj1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"confingD\", function() { return confingD; });\n/* harmony import */ var _tables_Models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tables/Models */ \"./main_server/server_mod/models/tables/Models.ts\");\n\r\nvar ModelNames;\r\n(function (ModelNames) {\r\n    ModelNames[\"User\"] = \"First_Users\";\r\n    ModelNames[\"Post\"] = \"First_Posts\";\r\n})(ModelNames || (ModelNames = {}));\r\nconst obj1 = [\"userId\", \"postId\"];\r\nconst confingD = {\r\n    [ModelNames.User]: {\r\n        class: _tables_Models__WEBPACK_IMPORTED_MODULE_0__[\"User1\"],\r\n        name: \"users\",\r\n        key: \"userId\",\r\n        otherFields: [],\r\n        fields: [{ 'name': 'string' }, { 'email': 'string' }, { 'password': \"string\" }, { id: 'number' }]\r\n    },\r\n    [ModelNames.Post]: {\r\n        class: _tables_Models__WEBPACK_IMPORTED_MODULE_0__[\"Post1\"],\r\n        name: \"posts\",\r\n        key: \"postId\",\r\n        fields: [],\r\n        otherFields: [],\r\n    },\r\n};\r\nconfingD[ModelNames.Post].otherFields = [{\r\n        key: confingD[ModelNames.User].key, model: confingD[ModelNames.User], modelName: ModelNames.User\r\n    }];\r\nconfingD[ModelNames.User].has = [{\r\n        key: confingD[ModelNames.User].key, modelName: ModelNames.Post, model: confingD[ModelNames.Post]\r\n    }];\r\nconfingD[ModelNames.Post].fields = [{ \"p1\": \"string\" }, { \"name\": 'string' },\r\n    { \"videoUrl\": \"string\" }, { [confingD[ModelNames.User].key]: \"number\" }];\r\nObject.freeze(confingD);\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/nameofmodels.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/tables/BaseMainClass.ts":
/*!***************************************************************!*\
  !*** ./main_server/server_mod/models/tables/BaseMainClass.ts ***!
  \***************************************************************/
/*! exports provided: BaseMainClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseMainClass\", function() { return BaseMainClass; });\n/* harmony import */ var _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tasks/mysql_jobs/function */ \"./main_server/server_mod/tasks/mysql_jobs/function.ts\");\n/* harmony import */ var _loadModels_loadModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadModels/loadModels */ \"./main_server/server_mod/models/tables/loadModels/loadModels.ts\");\n\r\n\r\nclass BaseMainClass {\r\n    constructor(obj, fconfig, fmodelName, attr) {\r\n        this.fconfig = fconfig;\r\n        this.fmodelName = fmodelName;\r\n        this.attr = attr;\r\n        this.fhasMany = [];\r\n        this.fbelongsTo = [];\r\n        this.has = {};\r\n        this.bel = {};\r\n        if (Object.keys(obj || {}).length) {\r\n            Object.defineProperties(this, Object.getOwnPropertyDescriptors(obj));\r\n        }\r\n    }\r\n    select(obj) {\r\n        const query = { ...obj, model: this.fmodelName };\r\n        return new _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().select(query);\r\n    }\r\n    async LoadModels() {\r\n        return new Promise((resolve, _reject) => {\r\n            if (this.fconfig) {\r\n                new _loadModels_loadModels__WEBPACK_IMPORTED_MODULE_1__[\"LoadModels\"].Load(this)\r\n                    .loadModelsSql(this)\r\n                    .then((_bool) => {\r\n                    resolve(this);\r\n                })\r\n                    .catch((_error) => {\r\n                    console.log(_error);\r\n                    resolve({});\r\n                });\r\n            }\r\n            else {\r\n                resolve && resolve(this);\r\n            }\r\n        });\r\n    }\r\n    create(obj) {\r\n        const query = { ...obj, model: this.fmodelName };\r\n        return new _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().create(query);\r\n    }\r\n    addBelTo(obj) {\r\n        return new _loadModels_loadModels__WEBPACK_IMPORTED_MODULE_1__[\"LoadModels\"].Load(this).addBelTo(obj);\r\n    }\r\n    addHas(obj) {\r\n        return new _loadModels_loadModels__WEBPACK_IMPORTED_MODULE_1__[\"LoadModels\"].Load(this).addHasTo(obj);\r\n    }\r\n    toJSON() {\r\n        return Object.fromEntries(Object.entries(this).filter(([key, _value]) => {\r\n            return !key.startsWith('f') && !this.attr.includes(key) && key != 'attr';\r\n        }));\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/tables/BaseMainClass.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/tables/Models.ts":
/*!********************************************************!*\
  !*** ./main_server/server_mod/models/tables/Models.ts ***!
  \********************************************************/
/*! exports provided: Post1, User1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tablesClass_Post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tablesClass/Post */ \"./main_server/server_mod/models/tables/tablesClass/Post.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Post1\", function() { return _tablesClass_Post__WEBPACK_IMPORTED_MODULE_0__[\"Post1\"]; });\n\n/* harmony import */ var _tablesClass_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tablesClass/User */ \"./main_server/server_mod/models/tables/tablesClass/User.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"User1\", function() { return _tablesClass_User__WEBPACK_IMPORTED_MODULE_1__[\"User1\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/tables/Models.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/tables/loadModels/loadModels.ts":
/*!***********************************************************************!*\
  !*** ./main_server/server_mod/models/tables/loadModels/loadModels.ts ***!
  \***********************************************************************/
/*! exports provided: LoadModels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadModels\", function() { return LoadModels; });\n/* harmony import */ var _nameofmodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../nameofmodels */ \"./main_server/server_mod/models/nameofmodels.ts\");\n/* harmony import */ var _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../tasks/mysql_jobs/function */ \"./main_server/server_mod/tasks/mysql_jobs/function.ts\");\n\r\n\r\nvar LoadModels;\r\n(function (LoadModels) {\r\n    class Load {\r\n        constructor(mainobj) {\r\n            this.mainobj = mainobj;\r\n        }\r\n        async *generate(array) {\r\n            for (let elem of array) {\r\n                yield elem;\r\n            }\r\n        }\r\n        async find(array, number) {\r\n            for await (let elem of this.generate(array)) { //// id of user in other tables\r\n                if (this.nameOfMod(elem)[0]) {\r\n                    let objNew;\r\n                    if (number == 1) {\r\n                        objNew = { [_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].key]: this.mainobj.id, model: this.nameOfMod(elem)[0] };\r\n                    }\r\n                    else if (number == 2) {\r\n                        objNew = { id: this.mainobj.fdiff[this.nameOfMod(elem)[1].key], model: this.nameOfMod(elem)[0] };\r\n                    }\r\n                    console.log(this.mainobj.id);\r\n                    const p = await new _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().select(objNew, this.mainobj);\r\n                    if (number == 1)\r\n                        this.mainobj.has[this.nameOfMod(elem)[1].name] = p;\r\n                    else if (number == 2)\r\n                        this.mainobj.bel[this.nameOfMod(elem)[1].name] = p;\r\n                    if (array.indexOf(elem) == array.length - 1) {\r\n                        console.log(\"resolve\");\r\n                        return this;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        nameOfMod(name) {\r\n            const i = Object.entries(_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"]).find(([, value]) => {\r\n                return value.name == name;\r\n            });\r\n            return i;\r\n        }\r\n        async loadModelsSql(obj) {\r\n            if (this.mainobj.fconfig.has.length) {\r\n                return this.find(this.mainobj.fconfig.has, 1);\r\n            }\r\n            else if (this.mainobj.fconfig.belTo.belTo.length) { /// id of other tables in user row\r\n                return this.find(this.mainobj.fconfig.belTo, 2);\r\n            }\r\n            this.next(obj);\r\n        }\r\n        next(obj) {\r\n            this.mainobj.fdiff = Object.fromEntries(Object.entries(obj).filter(([key]) => {\r\n                const obj = Object(_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].otherFields).keys().find((elem) => key == elem.key); //??\r\n                if (obj)\r\n                    return true;\r\n                return false;\r\n            }));\r\n        }\r\n        addBelTo(obj) {\r\n            console.log('in addBelTo');\r\n            const cl = _nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].otherFields.find((elem) => {\r\n                if (obj instanceof elem.model.class) {\r\n                    return true;\r\n                }\r\n                return null;\r\n            });\r\n            if (cl) {\r\n                const key = cl.key;\r\n                return new _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().updateDependency({ [key]: obj.id, model: this.mainobj.fmodelName, main_id: this.mainobj.id })\r\n                    .then(() => {\r\n                    this.mainobj.bel[cl.model.name] = [obj];\r\n                    return Promise.resolve(this.mainobj);\r\n                });\r\n            }\r\n            else {\r\n                throw new Error(`This model doesn't include the model ${obj}`);\r\n            }\r\n        }\r\n        addHasTo(obj) {\r\n            const hasmodel = _nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].has;\r\n            if (hasmodel.length) {\r\n                const cl = _nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].has.find((elem) => {\r\n                    if (obj instanceof elem.model.class) {\r\n                        return true;\r\n                    }\r\n                    return null;\r\n                });\r\n                return new _tasks_mysql_jobs_function__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().updateDependency({ [_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"confingD\"][this.mainobj.fmodelName].key]: this.mainobj.id, model: cl.modelName, main_id: obj.id })\r\n                    .then(() => {\r\n                    this.mainobj.has[cl.model.name] = [obj];\r\n                    return Promise.resolve(this.mainobj);\r\n                });\r\n            }\r\n            else {\r\n                throw new Error(`This model doesn't have the model ${obj}`);\r\n            }\r\n        }\r\n    }\r\n    LoadModels.Load = Load;\r\n})(LoadModels || (LoadModels = {}));\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/tables/loadModels/loadModels.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/tables/tablesClass/Post.ts":
/*!******************************************************************!*\
  !*** ./main_server/server_mod/models/tables/tablesClass/Post.ts ***!
  \******************************************************************/
/*! exports provided: Post1, P */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Post1\", function() { return Post1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"P\", function() { return newPost; });\n/* harmony import */ var _nameofmodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../nameofmodels */ \"./main_server/server_mod/models/nameofmodels.ts\");\n/* harmony import */ var _BaseMainClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseMainClass */ \"./main_server/server_mod/models/tables/BaseMainClass.ts\");\n\r\n\r\nlet Post1 = /** @class */ (() => {\r\n    class Post1 extends _BaseMainClass__WEBPACK_IMPORTED_MODULE_1__[\"BaseMainClass\"] {\r\n        constructor(obj, fconfig, attr) {\r\n            super(obj, fconfig, Post1.fmodelName, attr);\r\n            this.fconfig = fconfig;\r\n            this.fhasMany = [];\r\n            this.fbelongsTo = [_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].User];\r\n        }\r\n    }\r\n    Post1.fmodelName = _nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].Post;\r\n    return Post1;\r\n})();\r\n\r\nconst newPost = new Post1();\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/tables/tablesClass/Post.ts?");

/***/ }),

/***/ "./main_server/server_mod/models/tables/tablesClass/User.ts":
/*!******************************************************************!*\
  !*** ./main_server/server_mod/models/tables/tablesClass/User.ts ***!
  \******************************************************************/
/*! exports provided: User1, U */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"User1\", function() { return User1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"U\", function() { return nUser; });\n/* harmony import */ var _nameofmodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../nameofmodels */ \"./main_server/server_mod/models/nameofmodels.ts\");\n/* harmony import */ var _BaseMainClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseMainClass */ \"./main_server/server_mod/models/tables/BaseMainClass.ts\");\n\r\n\r\nlet User1 = /** @class */ (() => {\r\n    class User1 extends _BaseMainClass__WEBPACK_IMPORTED_MODULE_1__[\"BaseMainClass\"] {\r\n        constructor(obj, fconfig, attr) {\r\n            super(obj, fconfig, User1.fmodelName, attr);\r\n            this.fconfig = fconfig;\r\n            this.fhasMany = [_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].Post];\r\n            this.fbelongsTo = [];\r\n        }\r\n    }\r\n    User1.fmodelName = _nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].User;\r\n    return User1;\r\n})();\r\n\r\nconst nUser = new User1();\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/models/tables/tablesClass/User.ts?");

/***/ }),

/***/ "./main_server/server_mod/routes_handlers/handle.ts":
/*!**********************************************************!*\
  !*** ./main_server/server_mod/routes_handlers/handle.ts ***!
  \**********************************************************/
/*! exports provided: newH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newH\", function() { return newH; });\n/* harmony import */ var _data_data_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data.user */ \"./main_server/server_mod/data/data.user.ts\");\n/* harmony import */ var _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/tables/tablesClass/User */ \"./main_server/server_mod/models/tables/tablesClass/User.ts\");\n/* harmony import */ var _models_tables_tablesClass_Post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/tables/tablesClass/Post */ \"./main_server/server_mod/models/tables/tablesClass/Post.ts\");\n/* harmony import */ var _tasks_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks/file */ \"./main_server/server_mod/routes_handlers/tasks/file.ts\");\n\r\n\r\n\r\n\r\nclass Handle extends _tasks_file__WEBPACK_IMPORTED_MODULE_3__[\"FileHandle\"] {\r\n    constructor() {\r\n        super();\r\n        this.user = _data_data_user__WEBPACK_IMPORTED_MODULE_0__[\"AuthUser\"].user;\r\n        this.response = { messages: [], status: 'guest', errors: [] };\r\n    }\r\n    status_of_user(req, res, next) {\r\n        this.set_cors_policy(res)\r\n            .then(() => {\r\n            return this.set_user(req, res);\r\n        })\r\n            .then(() => {\r\n            if (next)\r\n                next();\r\n        })\r\n            .catch(() => res.status(500));\r\n    }\r\n    userdata() {\r\n        return this.response;\r\n    }\r\n    async set_cors_policy(res) {\r\n        res.set(\"Access-Control-Allow-Origin\", \"*\");\r\n        res.set(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, Authorization\");\r\n        res.set(\"Access-Control-Allow-Methods\", \"GET, POST, PUT, DELETE, OPTIONS\");\r\n        res.set(\"Access-Control-Allow-Credentials\", \"true\");\r\n        return Promise.resolve();\r\n    }\r\n    async set_user(req, _res) {\r\n        if (req.get('Authorization')) {\r\n            const auth = JSON.parse(req.get('Authorization'));\r\n            if (auth.name) {\r\n                const user = await _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_1__[\"U\"].select({ name: auth.name, and: true, email: auth.email });\r\n                console.log('auth');\r\n                if (user && user[0]) {\r\n                    this.response.status = \"user\";\r\n                    this.user = { ...user[0], auth: true };\r\n                }\r\n            }\r\n            else\r\n                return null;\r\n        }\r\n        else\r\n            return null;\r\n    }\r\n    async posts(_req, resp, next) {\r\n        let posts = await _models_tables_tablesClass_Post__WEBPACK_IMPORTED_MODULE_2__[\"P\"].select();\r\n        return resp.json(posts);\r\n    }\r\n    async post(req, resp, next) {\r\n        let post = await _models_tables_tablesClass_Post__WEBPACK_IMPORTED_MODULE_2__[\"P\"].select({ id: req.query.id });\r\n        return resp.json(post[0]);\r\n    }\r\n    async channels(_rq, resp, next) {\r\n        let channel = await _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_1__[\"U\"].select({ has: ['posts'], attr: ['name'] });\r\n        return resp.json(channel);\r\n    }\r\n}\r\nconst newH = new Handle();\r\n\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/routes_handlers/handle.ts?");

/***/ }),

/***/ "./main_server/server_mod/routes_handlers/tasks/auth.ts":
/*!**************************************************************!*\
  !*** ./main_server/server_mod/routes_handlers/tasks/auth.ts ***!
  \**************************************************************/
/*! exports provided: AuthReq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthReq\", function() { return AuthReq; });\n/* harmony import */ var _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/tables/tablesClass/User */ \"./main_server/server_mod/models/tables/tablesClass/User.ts\");\n\r\nclass AuthReq {\r\n    constructor() {\r\n        this.response = { messages: [], status: 'guest', errors: [] };\r\n    }\r\n    addUser(req, resp, _next) {\r\n        const body = req.body;\r\n        _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_0__[\"U\"].select({ name: body.name, or: true, email: body.email })\r\n            .then((result) => {\r\n            if (result[0]) {\r\n                this.response.errors[0] = 'Your email or name has been already taken';\r\n            }\r\n            return Promise.resolve();\r\n        })\r\n            .then(() => {\r\n            if (this.response.errors.length == 0) {\r\n                return _models_tables_tablesClass_User__WEBPACK_IMPORTED_MODULE_0__[\"U\"].create({ ...body })\r\n                    .then(() => {\r\n                    this.response.status = \"user\";\r\n                    this.response.messages.push('Вы зарегестрированы');\r\n                });\r\n            }\r\n            return Promise.resolve();\r\n        })\r\n            .catch((_error) => console.log(_error))\r\n            .finally(() => {\r\n            console.log(this.response);\r\n            resp.json(this.response);\r\n            resp.end();\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/routes_handlers/tasks/auth.ts?");

/***/ }),

/***/ "./main_server/server_mod/routes_handlers/tasks/file.ts":
/*!**************************************************************!*\
  !*** ./main_server/server_mod/routes_handlers/tasks/file.ts ***!
  \**************************************************************/
/*! exports provided: FileHandle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FileHandle\", function() { return FileHandle; });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ \"./main_server/server_mod/routes_handlers/tasks/auth.ts\");\n/* harmony import */ var _models_tables_tablesClass_Post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/tables/tablesClass/Post */ \"./main_server/server_mod/models/tables/tablesClass/Post.ts\");\n\r\n\r\n\r\n\r\nclass FileHandle extends _auth__WEBPACK_IMPORTED_MODULE_2__[\"AuthReq\"] {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.publicpath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(path__WEBPACK_IMPORTED_MODULE_0___default.a.dirname(__dirname), 'try', 'public');\r\n    }\r\n    getFile(req, resp, next) {\r\n        console.log('in getFile method');\r\n        const file = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(this.publicpath, req.params.filename);\r\n        fs__WEBPACK_IMPORTED_MODULE_1___default.a.access(file, fs__WEBPACK_IMPORTED_MODULE_1___default.a.constants.F_OK, (err) => {\r\n            if (err)\r\n                return resp.status(404);\r\n            resp.sendFile(file);\r\n        });\r\n    }\r\n    async uploadPost(req, resp) {\r\n        if (req.file.mimetype === \"video/mp4\" && this.user.auth && req.file.size < 59191200) {\r\n            console.log(Object.assign({}, { ...req.body }, { videoUrl: req.file.path }));\r\n            const post = await _models_tables_tablesClass_Post__WEBPACK_IMPORTED_MODULE_3__[\"P\"].create(Object.assign({}, { ...req.body }, { videoUrl: req.file.path }));\r\n            console.log('in upload after await' + JSON.stringify(post));\r\n            await post[0].addBelTo(this.user);\r\n            console.log('in upload after await');\r\n            this.response.status = 'Added';\r\n            this.response.id = post[0].id;\r\n        }\r\n        else {\r\n            console.log(this.user);\r\n            this.response.errors.push('You are not authenticated ');\r\n        }\r\n        return resp.json(this.response);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/routes_handlers/tasks/file.ts?");

/***/ }),

/***/ "./main_server/server_mod/tasks/mysql_jobs/connection.ts":
/*!***************************************************************!*\
  !*** ./main_server/server_mod/tasks/mysql_jobs/connection.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_nameofmodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/nameofmodels */ \"./main_server/server_mod/models/nameofmodels.ts\");\n/* harmony import */ var _models_tables_Models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/tables/Models */ \"./main_server/server_mod/models/tables/Models.ts\");\n\r\n\r\nvar Con;\r\n(function (Con) {\r\n    class Connection {\r\n        constructor() {\r\n            this.attr = [];\r\n            this.connection = __webpack_require__(/*! mysql2 */ \"mysql2\").createPool({\r\n                host: \"remotemysql.com\",\r\n                port: 3306,\r\n                password: \"Eu6f3raCnq\",\r\n                database: \"C5CTjjXhqo\",\r\n                user: \"C5CTjjXhqo\",\r\n                connectionLimit: 100000\r\n            }).promise();\r\n        }\r\n        async query(obj, content) {\r\n            this.attr = obj.attr || [];\r\n            return this.connection.execute(obj.statement)\r\n                .then((result) => result[0])\r\n                .then(async (res) => {\r\n                console.log('in then');\r\n                if (obj.hasOwnProperty('notloadModels')) {\r\n                    if (obj.notloadModels) {\r\n                        return null;\r\n                    }\r\n                }\r\n                let isTrue = false;\r\n                if (res[0].insertId) {\r\n                    isTrue = true;\r\n                }\r\n                switch (obj.model) {\r\n                    case _models_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].User:\r\n                        if (isTrue && content)\r\n                            return await this.addUsers([{ ...content, id: res[0].insertId }], { has: obj.has, belTo: obj.belTo });\r\n                        return await this.addUsers(res, { has: obj.has, belTo: obj.belTo });\r\n                    case _models_nameofmodels__WEBPACK_IMPORTED_MODULE_0__[\"ModelNames\"].Post:\r\n                        if (isTrue && content)\r\n                            return await this.addPosts([{ ...content, id: res[0].insertId }], { has: obj.has, belTo: obj.belTo });\r\n                        return await this.addPosts(res, { has: obj.has, belTo: obj.belTo });\r\n                    default:\r\n                        return null;\r\n                }\r\n            })\r\n                .catch((error) => {\r\n                return [];\r\n            });\r\n        }\r\n        async add(cl, ar, obj) {\r\n            const promises = ar.map(async (elem) => {\r\n                console.log(elem);\r\n                console.log('||||||||||||');\r\n                if (Object.keys(obj.has).length || Object.keys(obj.belTo).length) {\r\n                    return new cl(elem, obj, this.attr).LoadModels();\r\n                }\r\n                return Promise.resolve(new cl(elem, obj, this.attr));\r\n            });\r\n            return await Promise.all(promises);\r\n        }\r\n        async addUsers(ar, obj) {\r\n            return this.add(_models_tables_Models__WEBPACK_IMPORTED_MODULE_1__[\"User1\"], ar, obj);\r\n        }\r\n        async addPosts(ar, obj) {\r\n            return this.add(_models_tables_Models__WEBPACK_IMPORTED_MODULE_1__[\"Post1\"], ar, obj);\r\n        }\r\n    }\r\n    Con.Connection = Connection;\r\n})(Con || (Con = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Con.Connection);\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/tasks/mysql_jobs/connection.ts?");

/***/ }),

/***/ "./main_server/server_mod/tasks/mysql_jobs/function.ts":
/*!*************************************************************!*\
  !*** ./main_server/server_mod/tasks/mysql_jobs/function.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection */ \"./main_server/server_mod/tasks/mysql_jobs/connection.ts\");\n/* harmony import */ var _models_nameofmodels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/nameofmodels */ \"./main_server/server_mod/models/nameofmodels.ts\");\n\r\n\r\nvar Act;\r\n(function (Act) {\r\n    class Action {\r\n        constructor() {\r\n            this.sql = [\"and\", \"or\"];\r\n            this.query = \"\";\r\n            this.forbidden = new Set([\r\n                'has', 'belTo', 'model', 'attr'\r\n            ]);\r\n        }\r\n        create(query) {\r\n            const fields = _models_nameofmodels__WEBPACK_IMPORTED_MODULE_1__[\"confingD\"][query.model].fields;\r\n            const names = [];\r\n            fields.forEach((elem, index) => {\r\n                const types = Object.entries(elem)[0];\r\n                if (query.hasOwnProperty(types[0])) {\r\n                    if (types[1] == 'string') {\r\n                        this.query += `\"${Object.getOwnPropertyDescriptor(query, types[0]).value}\",`;\r\n                    }\r\n                    else {\r\n                        this.query += `${Object.getOwnPropertyDescriptor(query, types[0]).value},`;\r\n                    }\r\n                    names.push(types[0]);\r\n                }\r\n                if (index == fields.length - 1) {\r\n                    this.query = this.query.slice(0, this.query.lastIndexOf(',')).concat(')');\r\n                }\r\n            });\r\n            this.query = `INSERT INTO ${query.model}(${[...names]}) VALUES(`.concat(this.query);\r\n            let cont = Object.fromEntries(Object.entries(query).filter(([key]) => !this.forbidden.has(key)));\r\n            return new _connection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().query({ statement: this.query, model: query.model, has: [], belTo: [], attr: [] }, cont);\r\n        }\r\n        updateDependency(obj) {\r\n            const { main_id, model, ...rest } = obj;\r\n            const entry = String.prototype.concat.call('', Object.keys(rest)[0], '=', Object.values(rest)[0]);\r\n            this.query = `UPDATE ${model} SET ${entry} WHERE id=${main_id}`;\r\n            return new _connection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().query({ statement: this.query, model: model, has: [], belTo: [], attr: [], notloadModels: true });\r\n        }\r\n        select(obj, obj1) {\r\n            this.query = `SELECT * FROM ${obj.model}`;\r\n            const set = new Set(Object.entries(obj).filter(([x]) => !this.forbidden.has(x)));\r\n            if (set.size > 0) {\r\n                const obj1 = Array.from(set).map(([key, value]) => {\r\n                    if (this.sql.includes(key)) {\r\n                        return ` ${key}  `;\r\n                    }\r\n                    else if (!this.forbidden.has(key)) {\r\n                        const find = _models_nameofmodels__WEBPACK_IMPORTED_MODULE_1__[\"confingD\"][obj.model].fields.find((elem) => {\r\n                            return Object.keys(elem)[0] == key;\r\n                        });\r\n                        if (find) {\r\n                            const find1 = Object.values(find)[0];\r\n                            switch (find1) {\r\n                                case \"string\":\r\n                                    return ` ${key} = \"${value}\"`;\r\n                                case \"number\":\r\n                                    return ` ${key} = ${value}`;\r\n                            }\r\n                        }\r\n                        else {\r\n                            throw new Error('In function.ts keys error');\r\n                        }\r\n                    }\r\n                }).join(\" \");\r\n                this.query += ` WHERE ${obj1}`;\r\n            }\r\n            console.log('Statement:' + this.query);\r\n            console.log(obj);\r\n            return new _connection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().query({ statement: this.query, model: obj.model, has: obj.has || [], belTo: obj.belongTo || [], attr: obj.attr || [] });\r\n        }\r\n    }\r\n    Act.Action = Action;\r\n})(Act || (Act = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Act.Action);\r\n\n\n//# sourceURL=webpack:///./main_server/server_mod/tasks/mysql_jobs/function.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql2\");\n\n//# sourceURL=webpack:///external_%22mysql2%22?");

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