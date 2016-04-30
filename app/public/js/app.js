(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	factory(global.Ractive)
}(this, function (Ractive) { 'use strict';

	Ractive = ('default' in Ractive ? Ractive['default'] : Ractive);

	'use strict';

	var utils_has = {
		// https://github.com/Modernizr/Modernizr/blob/924c7611c170ef2dc502582e5079507aff61e388/feature-detects/history.js
		history: function history() {
			var ua = navigator.userAgent;

			if ((~ua.indexOf('Android 2.') || ~ua.indexOf('Android 4.0')) && ~ua.indexOf('Mobile Safari') && ! ~ua.indexOf('Chrome')) {
				return false;
			}

			return window.history && 'pushState' in window.history;
		},
		localStorage: (function (_localStorage) {
			function localStorage() {
				return _localStorage.apply(this, arguments);
			}

			localStorage.toString = function () {
				return _localStorage.toString();
			};

			return localStorage;
		})(function () {
			try {
				localStorage.setItem('localStorageTest', 1);
				localStorage.removeItem('localStorageTest');
			} catch (e) {
				return false;
			}

			return true;
		})
	};

	var __import0______options__ = {
		template: {v:3,t:[{p:[1,1,0],t:7,e:"ul",a:{"class":"nav navbar-nav navbar-nav-c"},f:[{p:[2,2,42],t:7,e:"li",a:{"class":"dropdown"},f:[{p:[3,3,66],t:7,e:"a",a:{href:"/free-open-source-cdn/javascript-cdn","class":"dropdown-toggle clickable router-ignore","data-toggle":"dropdown"},f:["Free Open Source CDN"]}," ",{p:[5,3,212],t:7,e:"ul",a:{"class":"dropdown-menu"},f:[{p:[6,4,242],t:7,e:"li",f:[{p:[6,8,246],t:7,e:"a",a:{href:"/free-open-source-cdn/javascript-cdn"},f:["JavaScript CDN"]}]}," ",{p:[9,4,474],t:7,e:"li",f:[{p:[9,8,478],t:7,e:"a",a:{href:"/free-open-source-cdn/custom-cdn-for-open-source"},f:["Custom CDN for Open Source"]}]}]}]}," ",{p:[13,2,590],t:7,e:"li",a:{"class":"dropdown"},f:[{p:[14,3,614],t:7,e:"a",a:{href:"/features/multi-cdn-load-balancing","class":"dropdown-toggle clickable router-ignore","data-toggle":"dropdown"},f:["Features"]}," ",{p:[16,3,746],t:7,e:"ul",a:{"class":"dropdown-menu"},f:[{p:[17,4,776],t:7,e:"li",f:[{p:[17,8,780],t:7,e:"a",a:{href:"/features/multi-cdn-load-balancing"},f:["Multi-CDN Load balancing"]}]}," ",{p:[18,4,862],t:7,e:"li",f:[{p:[18,8,866],t:7,e:"a",a:{href:"/features/jsdelivr-cdn-features"},f:["jsDelivr CDN features"]}]}," ",{p:[19,4,942],t:7,e:"li",f:[{p:[19,8,946],t:7,e:"a",a:{href:"/features/network-map"},f:["Network Map"]}]}," ",{p:[20,4,1002],t:7,e:"li",f:[{p:[20,8,1006],t:7,e:"a",a:{href:"/features/cdn-in-asia-and-china"},f:["CDN in Asia and China"]}]}]}]}," ",{p:[24,2,1096],t:7,e:"li",f:[{p:[24,6,1100],t:7,e:"a",a:{href:"/statistics"},f:["Statistics"]}]}," ",{p:[26,2,1144],t:7,e:"li",a:{"class":"dropdown"},f:[{p:[27,3,1168],t:7,e:"a",a:{href:"/tools/debug-tool","class":"dropdown-toggle clickable router-ignore","data-toggle":"dropdown"},f:["Tools"]}," ",{p:[29,3,1280],t:7,e:"ul",a:{"class":"dropdown-menu"},f:[{p:[30,4,1310],t:7,e:"li",f:[{p:[30,8,1314],t:7,e:"a",a:{href:"/tools/debug-tool"},f:["Debug tool"]}]}]}]}," ",{p:[34,2,1379],t:7,e:"li",a:{"class":"dropdown"},f:[{p:[35,3,1403],t:7,e:"a",a:{href:"/sponsors/our-sponsors","class":"dropdown-toggle clickable router-ignore","data-toggle":"dropdown"},f:["Sponsors"]}," ",{p:[37,3,1523],t:7,e:"ul",a:{"class":"dropdown-menu"},f:[{p:[38,4,1553],t:7,e:"li",f:[{p:[38,8,1557],t:7,e:"a",a:{href:"/sponsors/our-sponsors"},f:["Our sponsors"]}]}," ",{p:[39,4,1615],t:7,e:"li",f:[{p:[39,8,1619],t:7,e:"a",a:{href:"/sponsors/become-a-sponsor"},f:["Become a sponsor"]}]}]}]}," ",{p:[43,2,1699],t:7,e:"li",f:[{p:[43,6,1703],t:7,e:"a",a:{href:"http://blog.jsdelivr.com/"},f:["Blog"]}]}]}]},
	},
	__import0____component={},
	__import0______prop__,
	__import0______export__;


	if ( typeof __import0____component.exports === "object" ) {
		for ( __import0______prop__ in __import0____component.exports ) {
			if ( __import0____component.exports.hasOwnProperty(__import0______prop__) ) {
				__import0______options__[__import0______prop__] = __import0____component.exports[__import0______prop__];
			}
		}
	}

	__import0______export__ = Ractive.extend( __import0______options__ );

	var __import0__ = __import0______export__;

	'use strict';

	var algolia = algoliasearch('0UIFPQ3RGG', 'fd0fa679c0defa9861821fc129385ab5', { protocol: 'https:' });

	'use strict';

	var __import1____jsDelivrIndex = algolia.initIndex('jsDelivr');

	var __import1__ = function () {
		return Promise.resolve().then(function () {
			var hasLocalStorage = utils_has.localStorage();
			var now = Date.now();

			if (hasLocalStorage && localStorage.getItem('nbProjectsExpires') >= now) {
				return localStorage.getItem('nbProjects');
			}

			return __import1____jsDelivrIndex.search('', { analytics: false }).then(function (response) {
				var nbProjects = Math.floor(response.nbHits / 50) * 50;

				if (hasLocalStorage) {
					localStorage.setItem('nbProjects', nbProjects);
					localStorage.setItem('nbProjectsExpires', now + 604800000); // Cache for one week.
				}

				return nbProjects;
			});
		});
	}

	var header____options__ = {
		template: {v:3,t:[{p:[3,1,68],t:7,e:"header",a:{"class":"header"},f:[{t:4,f:[{p:[5,3,119],t:7,e:"div",a:{"class":"header-sponsors header-sponsors-top"},f:[{p:[6,4,173],t:7,e:"div",a:{"class":"container"},f:[{p:[7,5,202],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/"},f:[{p:[7,55,252],t:7,e:"img",a:{src:"/img/sponsors-header/cedexis.png"}}]}," ",{p:[8,5,306],t:7,e:"a",a:{target:"_blank",href:"http://tracking.maxcdn.com/c/47243/36539/378"},f:[{p:[8,76,377],t:7,e:"img",a:{src:"/img/sponsors-header/maxcdn.png"}}]}," ",{p:[9,5,430],t:7,e:"a",a:{target:"_blank",href:"https://www.cloudflare.com/"},f:[{p:[9,59,484],t:7,e:"img",a:{src:"/img/sponsors-header/cloudflare.png"}}]}," ",{p:[10,5,541],t:7,e:"a",a:{target:"_blank",href:"https://www.keycdn.com/"},f:[{p:[10,55,591],t:7,e:"img",a:{src:"/img/sponsors-header/keycdn.png"}}]}," ",{p:[11,5,644],t:7,e:"a",a:{target:"_blank",href:"https://nsone.net/"},f:[{p:[11,50,689],t:7,e:"img",a:{src:"/img/sponsors-header/nsone.png"}}]}]}]}],n:50,r:"sponsorsOnTop",p:[4,2,94]}," ",{p:[16,2,785],t:7,e:"nav",a:{"class":"navbar navbar-default"},f:[{p:[17,3,824],t:7,e:"div",a:{"class":"container"},f:[{p:[18,4,852],t:7,e:"div",a:{"class":"row"},f:[{p:[19,5,875],t:7,e:"div",a:{"class":"col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-0 col-xs-4 col-xs-offset-2"},f:[{p:[20,6,970],t:7,e:"a",a:{"class":"navbar-brand",href:"/"},f:[{p:[20,39,1003],t:7,e:"img",a:{src:"/img/logo-34.png",height:"34"}}]}]}," ",{p:[23,5,1067],t:7,e:"button",a:{type:"button","class":"navbar-toggle collapsed","data-toggle":"collapse","data-target":"#header-navbar","aria-expanded":"false"},f:[{p:[24,6,1202],t:7,e:"span",a:{"class":"sr-only"},f:["Toggle navigation"]}," ",{p:[25,6,1255],t:7,e:"span",a:{"class":"icon-bar"}}," ",{p:[26,6,1292],t:7,e:"span",a:{"class":"icon-bar"}}," ",{p:[27,6,1329],t:7,e:"span",a:{"class":"icon-bar"}}]}," ",{p:[30,5,1382],t:7,e:"div",a:{"class":"collapse navbar-collapse",id:"header-navbar"},f:[{p:[31,6,1446],t:7,e:"div",a:{"class":"col-md-10 col-sm-12 col-xs-18"},f:[{p:[32,7,1497],t:7,e:"NavbarNav"}]}," ",{p:[35,6,1542],t:7,e:"div",a:{"class":"col-md-6 col-sm-6 col-sm-offset-0 col-xs-16 col-xs-offset-2 xs-padding"},f:[{p:[36,7,1634],t:7,e:"input",a:{type:"text","class":"search-input",value:[{t:2,r:"query",p:[36,54,1681]}],placeholder:["Search more than ",{t:2,r:"nbProjects",p:[36,95,1722]}," open source projects..."]},v:{input:{m:"search",a:{r:[],s:"[]"}}}}]}," ",{p:[39,6,1804],t:7,e:"div",a:{"class":"col-md-3 col-sm-3 col-xs-4 xs-padding md-right xs-right"},f:[{p:[40,7,1881],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md","class":"btn btn-primary"},f:[{p:[40,106,1980],t:7,e:"i",a:{"class":"fa fa-cloud-upload"}},"Add Project"]}]}]}]}]}]}," ",{t:4,f:[{p:[48,3,2118],t:7,e:"div",a:{"class":"header-sponsors header-sponsors-bottom"},f:[{p:[49,4,2175],t:7,e:"div",a:{"class":"container"},f:[{p:[50,5,2204],t:7,e:"div",a:{"class":"col-lg-20 col-lg-offset-2 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:[{p:[51,6,2328],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/"},f:[{p:[51,56,2378],t:7,e:"img",a:{src:"/img/sponsors-header/cedexis.png"}}]}," ",{p:[52,6,2433],t:7,e:"a",a:{target:"_blank",href:"http://tracking.maxcdn.com/c/47243/36539/378"},f:[{p:[52,77,2504],t:7,e:"img",a:{src:"/img/sponsors-header/maxcdn.png"}}]}," ",{p:[53,6,2558],t:7,e:"a",a:{target:"_blank",href:"https://www.cloudflare.com/"},f:[{p:[53,60,2612],t:7,e:"img",a:{src:"/img/sponsors-header/cloudflare.png"}}]}," ",{p:[54,6,2670],t:7,e:"a",a:{target:"_blank",href:"https://www.keycdn.com/"},f:[{p:[54,56,2720],t:7,e:"img",a:{src:"/img/sponsors-header/keycdn.png"}}]}," ",{p:[55,6,2774],t:7,e:"a",a:{target:"_blank",href:"https://nsone.net/"},f:[{p:[55,51,2819],t:7,e:"img",a:{src:"/img/sponsors-header/nsone.png"}}]}," ",{p:[56,6,2872],t:7,e:"a",a:{"class":"header-become-a-sponsor",href:"/sponsors/become-a-sponsor"},f:["Become a sponsor"]}]}]}]}],n:51,r:"sponsorsOnTop",p:[47,2,2089]}]}," ",{t:4,f:[{p:[64,2,3065],t:7,e:"div",a:{"class":"header-margin-bottom"}}],n:51,r:"sponsorsOnTop",p:[63,1,3037]}]},
		components:{	NavbarNav: __import0__}
	},
	header__component={},
	header____prop__,
	header____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/count-projects': __import1__
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		header__component.exports = {
			data: function () {
				return {
					offsetTop: 124,
					stickyOnBottom: true,
				};
			},
			oninit: function () {
				if (!Ractive.isServer) {
					var countProjects = require('public/js/utils/count-projects');
					var _this = this;

					// Show number of hosted projects.
					countProjects().then(function (nbProjects) {
						nbProjects && _this.set('nbProjects', nbProjects);
					});
				}
			},
			oncomplete: function () {
				if (location.pathname === '/' && this.get('query')) {
					var input = this.find('input');
					var value = input.value;

					input.focus();

					// Make sure the cursor is at the end of the input.
					input.value = '';
					input.value = value;
				} else {
					this.set('prevQuery', this.get('query'));
				}

				this.findAll('a').forEach(function (a) {
					var $a = $(a);

					if (location.pathname.indexOf($a.attr('href')) === 0) {
						$a.addClass('active');
					} else {
						$a.removeClass('active');
					}
				});
			},
			search: function () {
				// IE likes to fire "input" events for no particular reason. Make sure the query has actually changed.
				if (location.pathname !== '/' && this.get('query') !== this.get('prevQuery')) {
					this.set('app.config.animateScrolling', false);
					this.get('app.router')
						.dispatch('/?query=' + encodeURIComponent(this.find('input').value) + '&collection=' + encodeURIComponent(JSON.stringify(this.root.get('collection'))));
				}
			},
		};

	if ( typeof header__component.exports === "object" ) {
		for ( header____prop__ in header__component.exports ) {
			if ( header__component.exports.hasOwnProperty(header____prop__) ) {
				header____options__[header____prop__] = header__component.exports[header____prop__];
			}
		}
	}

	header____export__ = Ractive.extend( header____options__ );

	})();


	var header = header____export__;

	var cAbout____options__ = {
		template: {v:3,t:[{p:[3,1,66],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[3,14,79]}],query:[{t:2,r:"query",p:[3,30,95]}]}}," ",{p:[5,1,119],t:7,e:"div",a:{"class":"about"},f:[{p:[6,2,141],t:7,e:"div",a:{"class":"container"},f:[{p:[7,3,168],t:7,e:"div",a:{"class":"row"},f:[{p:[8,4,190],t:7,e:"div",a:{"class":"col-xs-12 col-xs-offset-6"},f:[{p:[9,5,235],t:7,e:"h1",a:{"class":"text-center"},f:["About jsDelivr"]}," ",{p:[11,5,286],t:7,e:"p",a:{"class":"text-center"},f:["jsDelivr is a public open-source CDN (Content Delivery Network) where anyone can submit a project to be hosted and delivered by our network. Unlike Google or Microsoft, we host all kinds of projects - JavaScript libraries, CSS frameworks, fonts, WordPress plugins, etc. - and we don’t look at the popularity of the project. By using GitHub, we allow the community to fully interact with jsDelivr by adding and updating files."]}]}]}]}," ",{p:[20,2,798],t:7,e:"div",a:{"class":"about-features"},f:[{p:[21,3,830],t:7,e:"div",a:{"class":"container"},f:[{p:[22,4,858],t:7,e:"div",a:{"class":"row"},f:[{p:[23,5,881],t:7,e:"div",a:{"class":"col-sm-2 col-sm-offset 6 col-xs-3 col-xs-offset-5"},f:[{p:[24,6,951],t:7,e:"img",a:{src:"/img/about/uptime.png"}}]}," ",{p:[27,5,1004],t:7,e:"div",a:{"class":"col-xs-10"},f:[{p:[28,6,1034],t:7,e:"h3",f:["UPTIME"]}," ",{p:[30,6,1058],t:7,e:"p",f:["Downtime, timeouts or slow responses are simply unacceptable. The idea is not to simply offer a public CDN, but to offer the best possible experience and a rock-solid product. We have multiple layers of failover on different levels. Read about in detail ",{p:[32,85,1330],t:7,e:"a",a:{href:"/features/multi-cdn-load-balancing"},f:["Multi-CDN Load balancing"]},"."]}," ",{p:[35,6,1424],t:7,e:"p",f:["According to ",{p:[36,20,1448],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/reports/"},f:["Cedexis Radar"]},", jsDelivr has the highest uptime across ALL enterprise CDNs including Akamai, CloudFront and Edgecast."]}]}]}," ",{p:[41,4,1667],t:7,e:"div",a:{"class":"row"},f:[{p:[42,5,1690],t:7,e:"div",a:{"class":"col-sm-2 col-sm-offset 6 col-xs-3 col-xs-offset-5"},f:[{p:[43,6,1760],t:7,e:"img",a:{src:"/img/about/performance.png"}}]}," ",{p:[46,5,1818],t:7,e:"div",a:{"class":"col-xs-10"},f:[{p:[47,6,1848],t:7,e:"h3",f:["PERFORMANCE"]}," ",{p:[49,6,1877],t:7,e:"p",f:["Multi-CDN load balancing, smart algorithm, real time data, real user metrics and multiple CDN providers all come together to ensure the best possible performance for all users."]}]}]}," ",{p:[55,4,2105],t:7,e:"div",a:{"class":"row"},f:[{p:[56,5,2128],t:7,e:"div",a:{"class":"col-sm-2 col-sm-offset 6 col-xs-3 col-xs-offset-5"},f:[{p:[57,6,2198],t:7,e:"img",a:{src:"/img/about/open-source.png"}}]}," ",{p:[60,5,2256],t:7,e:"div",a:{"class":"col-xs-10"},f:[{p:[61,6,2286],t:7,e:"h3",f:["OPEN SOURCE"]}," ",{p:[63,6,2315],t:7,e:"p",f:["Our project is open source and \"not for profit\". Everything we do, we do it for the community and a better web. We are focused to help all developers and website owners. And thanks to our open design we will never be vendor-locked to a single provider or technology, this means that no company can influence the project in a hurtful way as we can simply move away."]}]}]}," ",{p:[69,4,2731],t:7,e:"div",a:{"class":"row"},f:[{p:[70,5,2754],t:7,e:"div",a:{"class":"col-sm-2 col-sm-offset 6 col-xs-3 col-xs-offset-5"},f:[{p:[71,6,2824],t:7,e:"img",a:{src:"/img/about/security.png"}}]}," ",{p:[74,5,2879],t:7,e:"div",a:{"class":"col-xs-10"},f:[{p:[75,6,2909],t:7,e:"h3",f:["SECURITY"]}," ",{p:[77,6,2935],t:7,e:"p",f:["All jsDelivr related accounts are protected using 2-step authentication and IP whitelists by services that support them, along with a strong password. The origin server is accessible only from a few whitelisted IPs used by a single admin and a Github deployment service. All precautions are taken to protect our users."]}]}]}]}]}," ",{p:[86,2,3329],t:7,e:"div",a:{"class":"about-faq"},f:[{p:[87,3,3356],t:7,e:"div",a:{"class":"container"},f:[{p:[88,4,3384],t:7,e:"h1",a:{"class":"text-center"},f:["FAQ"]}," ",{p:[90,4,3423],t:7,e:"div",a:{"class":"row"},f:[{p:[91,5,3446],t:7,e:"div",a:{"class":"col-xs-5 col-xs-offset-2"},f:[{p:[92,6,3491],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[93,7,3521],t:7,e:"div",a:{"class":"faq-question"},f:["How can jsDelivr be free? How can it survive in the long term?"]}," ",{p:[97,7,3642],t:7,e:"div",a:{"class":"faq-answer"},f:["CDN traffic is expensive, yes. But all of our traffic and services are sponsored by awesome companies that want to make the web a faster and better place. That means that it doesn't matter how much traffic a plugin or project can generate, there is nothing to worry about."]}]}," ",{p:[103,6,3991],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[104,7,4021],t:7,e:"div",a:{"class":"faq-question"},f:["How can I help?"]}," ",{p:[108,7,4095],t:7,e:"div",a:{"class":"faq-answer"},f:["If you are a company, please checkout Sponsors for more details. If you are an individual, you can donate money or help us with development (API, website, new features) of the website. If you create or find a front end resource that is not hosted yet on jsDelivr, you may ",{p:[110,111,4408],t:7,e:"a",a:{target:"_blank",href:"https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md"},f:["submit it for addition"]},". You can also write blog posts or submit new ideas and features. Just send us an email."]}]}]}," ",{p:[115,5,4660],t:7,e:"div",a:{"class":"col-xs-5"},f:[{p:[116,6,4689],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[117,7,4719],t:7,e:"div",a:{"class":"faq-question"},f:["Are there any bandwidth limits?"]}," ",{p:[121,7,4809],t:7,e:"div",a:{"class":"faq-answer"},f:["No and there will never be."]}]}," ",{p:[126,6,4905],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[127,7,4935],t:7,e:"div",a:{"class":"faq-question"},f:["Why do my tests of jsDelivr show bad performance?"]}," ",{p:[131,7,5043],t:7,e:"div",a:{"class":"faq-answer"},f:["jsDelivr relies on RUM tests made by real users. Based on this data it can intelligently select the best provider for each user. Unfortunately this also means that any synthetic test of jsDelivr that runs on servers will result in worse performance. Services like Pingdom, WebPageTest, or any other server based testing will not be able to take the full advantage of our intelligent load balancing. All servers fallback to country level performance data, not ASN based like real users do."]}]}]}," ",{p:[139,5,5627],t:7,e:"div",a:{"class":"col-xs-5"},f:[{p:[140,6,5656],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[141,7,5686],t:7,e:"div",a:{"class":"faq-question"},f:["Does MaxCDN own jsDelivr? (or any other company)"]}," ",{p:[145,7,5793],t:7,e:"div",a:{"class":"faq-answer"},f:["No, MaxCDN is one of our biggest sponsors, but they don't own or influence the project in any way. Neither does any other company."]}]}," ",{p:[150,6,5992],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[151,7,6022],t:7,e:"div",a:{"class":"faq-question"},f:["Why are some projects tagged as version 0.1?"]}," ",{p:[155,7,6125],t:7,e:"div",a:{"class":"faq-answer"},f:["Some times it's hard to find what version is a project because the developer doesn't mention it anywhere. In these cases we just use 0.1 as the starting version and increase it on next updates."]}]}," ",{p:[161,6,6395],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[162,7,6425],t:7,e:"div",a:{"class":"faq-question"},f:["How are you making money?"]}," ",{p:[166,7,6509],t:7,e:"div",a:{"class":"faq-answer"},f:["We don't, the project is a non-profit. Most of the stuff is sponsored by companies and rest is paid by @jimaek."]}]}]}," ",{p:[172,5,6700],t:7,e:"div",a:{"class":"col-xs-5"},f:[{p:[173,6,6729],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[174,7,6759],t:7,e:"div",a:{"class":"faq-question"},f:["Will you host anything?"]}," ",{p:[178,7,6841],t:7,e:"div",a:{"class":"faq-answer"},f:["Not quite: we require projects to have some documentation, have a license, and distribute the source code. We cant host your custom files."]}]}," ",{p:[183,6,7048],t:7,e:"div",a:{"class":"faq-item"},f:[{p:[184,7,7078],t:7,e:"div",a:{"class":"faq-question"},f:["How does jsDelivr performance compare to other CDNs?"]}," ",{p:[188,7,7189],t:7,e:"div",a:{"class":"faq-answer"},f:["jsDelivr is one of the fastest CDN in the world. Check the ",{p:[189,67,7281],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/reports/"},f:["Cedexis Reports"]}," for the latest information"]}]}]}]}]}]}," ",{p:[197,2,7459],t:7,e:"div",a:{"class":"about-team",id:"team"},f:[{p:[198,3,7497],t:7,e:"div",a:{"class":"container"},f:[{p:[199,4,7525],t:7,e:"h1",a:{"class":"text-center"},f:["Team"]}," ",{p:[201,4,7565],t:7,e:"div",a:{"class":"row"},f:[{p:[202,5,7588],t:7,e:"div",a:{"class":"col-xs-12 col-xs-offset-6"},f:[{p:[203,6,7634],t:7,e:"i",a:{"class":"clickable fa fa-angle-left fa-3x"},v:{click:{m:"prev",a:{r:[],s:"[]"}}}}," ",{p:[204,6,7707],t:7,e:"i",a:{"class":"clickable fa fa-angle-right fa-3x"},v:{click:{m:"next",a:{r:[],s:"[]"}}}}," ",{p:[206,6,7783],t:7,e:"div",a:{"class":"team-members"},f:[{p:[207,7,7817],t:7,e:"div",a:{"class":"team-member"},f:[{p:[208,8,7851],t:7,e:"h3",f:["Dmitriy Akulov"]}," ",{p:[210,8,7885],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/dmitriy-akulov.png"}}," ",{p:[212,8,7969],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[213,9,8010],t:7,e:"a",a:{target:"_blank",href:"https://ua.linkedin.com/in/dakulov"},f:[{p:[213,70,8071],t:7,e:"img",a:{src:"/img/about/social-icons/linkedin.png"}}]}," ",{p:[214,9,8133],t:7,e:"a",a:{target:"_blank",href:"https://twitter.com/jimaek"},f:[{p:[214,62,8186],t:7,e:"img",a:{src:"/img/about/social-icons/twitter.png"}}]}," ",{p:[215,9,8247],t:7,e:"a",a:{target:"_blank",href:"https://github.com/jimaek"},f:[{p:[215,61,8299],t:7,e:"img",a:{src:"/img/about/social-icons/github.png"}}]}]}]}," ",{p:[219,7,8388],t:7,e:"div",a:{"class":"team-member"},f:[{p:[220,8,8422],t:7,e:"h3",f:["Graeme Yeates"]}," ",{p:[222,8,8455],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/graeme-yeates.png"}}," ",{p:[224,8,8538],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[225,9,8579],t:7,e:"a",a:{target:"_blank",href:"https://twitter.com/GraemeYeates"},f:[{p:[225,68,8638],t:7,e:"img",a:{src:"/img/about/social-icons/twitter.png"}}]}," ",{p:[226,9,8699],t:7,e:"a",a:{target:"_blank",href:"https://github.com/megawac"},f:[{p:[226,62,8752],t:7,e:"img",a:{src:"/img/about/social-icons/github.png"}}]}]}]}," ",{p:[230,7,8841],t:7,e:"div",a:{"class":"team-member"},f:[{p:[231,8,8875],t:7,e:"h3",f:["Patrick Nommensen"]}," ",{p:[233,8,8912],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/patrick-nommensen.png"}}," ",{p:[235,8,8999],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[236,9,9040],t:7,e:"a",a:{target:"_blank",href:"https://linkedin.com/in/pnommensen"},f:[{p:[236,70,9101],t:7,e:"img",a:{src:"/img/about/social-icons/linkedin.png"}}]}," ",{p:[237,9,9163],t:7,e:"a",a:{target:"_blank",href:"https://twitter.com/pnommensen"},f:[{p:[237,66,9220],t:7,e:"img",a:{src:"/img/about/social-icons/twitter.png"}}]}]}]}," ",{p:[241,7,9310],t:7,e:"div",a:{"class":"team-member"},f:[{p:[242,8,9344],t:7,e:"h3",f:["Martin Kolárik"]}," ",{p:[244,8,9378],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/martin-kolarik.png"}}," ",{p:[246,8,9462],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[247,9,9503],t:7,e:"a",a:{target:"_blank",href:"https://twitter.com/MaKolarik"},f:[{p:[247,65,9559],t:7,e:"img",a:{src:"/img/about/social-icons/twitter.png"}}]}," ",{p:[248,9,9620],t:7,e:"a",a:{target:"_blank",href:"https://github.com/MartinKolarik"},f:[{p:[248,68,9679],t:7,e:"img",a:{src:"/img/about/social-icons/github.png"}}]}," ",{p:[249,9,9739],t:7,e:"a",a:{target:"_blank",href:"http://kolarik.sk/"},f:[{p:[249,54,9784],t:7,e:"img",a:{src:"/img/about/social-icons/website.png"}}]}]}]}," ",{p:[253,7,9874],t:7,e:"div",a:{"class":"team-member"},f:[{p:[254,8,9908],t:7,e:"h3",f:["Austin Brown"]}," ",{p:[256,8,9940],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/austin-brown.png"}}," ",{p:[258,8,10022],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[259,9,10063],t:7,e:"a",a:{target:"_blank",href:"http://www.linkedin.com/in/austinjbrown"},f:[{p:[259,75,10129],t:7,e:"img",a:{src:"/img/about/social-icons/linkedin.png"}}]}," ",{p:[260,9,10191],t:7,e:"a",a:{target:"_blank",href:"https://github.com/UnbounDev"},f:[{p:[260,64,10246],t:7,e:"img",a:{src:"/img/about/social-icons/github.png"}}]}]}]}," ",{p:[264,7,10335],t:7,e:"div",a:{"class":"team-member"},f:[{p:[265,8,10369],t:7,e:"h3",f:["Andrew Sun"]}," ",{p:[267,8,10399],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/andrew-sun.png"}}," ",{p:[269,8,10479],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[270,9,10520],t:7,e:"a",a:{target:"_blank",href:"https://andrewsun.com/"},f:[{p:[270,58,10569],t:7,e:"img",a:{src:"/img/about/social-icons/website.png"}}]}," ",{p:[271,9,10630],t:7,e:"a",a:{target:"_blank",href:"https://github.com/as-com"},f:[{p:[271,61,10682],t:7,e:"img",a:{src:"/img/about/social-icons/github.png"}}]}]}]}," ",{p:[275,7,10771],t:7,e:"div",a:{"class":"team-member"},f:[{p:[276,8,10805],t:7,e:"h3",f:["Juho Vepsäläinen"]}," ",{p:[278,8,10841],t:7,e:"img",a:{"class":"team-member-avatar",src:"/img/about/team/juho-vepsalainen.png"}}," ",{p:[280,8,10927],t:7,e:"div",a:{"class":"team-social-icons"},f:[{p:[281,9,10968],t:7,e:"a",a:{target:"_blank",href:"http://survivejs.com/"},f:[{p:[281,57,11016],t:7,e:"img",a:{src:"/img/about/social-icons/website.png"}}]}]}]}]}]}]}]}]}]}]},
		components:{	Header: header}
	},
	cAbout__component={},
	cAbout____prop__,
	cAbout____export__;


		cAbout__component.exports = {
			data: function () {
				return {
					title: 'About - jsDelivr',
				};
			},
			onrender: function () {
				this.observe('teamPosition', function (newValue) {
					$(this.find('.team-members')).animate({ scrollLeft: newValue * $(this.find('.team-member')).width() });
				}, { init: false });

				this.set({
					teamPosition: 0,
					teamLength: this.findAll('.team-member').length - 4, // 4 = number of visible members
				});
			},
			next: function () {
				if (this.get('teamPosition') < this.get('teamLength')) {
					this.add('teamPosition');
				}
			},
			prev: function () {
				if (this.get('teamPosition') > 0) {
					this.subtract('teamPosition');
				}
			},
		};

	if ( typeof cAbout__component.exports === "object" ) {
		for ( cAbout____prop__ in cAbout__component.exports ) {
			if ( cAbout__component.exports.hasOwnProperty(cAbout____prop__) ) {
				cAbout____options__[cAbout____prop__] = cAbout__component.exports[cAbout____prop__];
			}
		}
	}

	cAbout____export__ = Ractive.extend( cAbout____options__ );

	var cAbout = cAbout____export__;

	var cConsultationServices____options__ = {
		template: {v:3,t:[{p:[3,1,66],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[3,14,79]}],query:[{t:2,r:"query",p:[3,30,95]}]}}," ",{p:[4,1,117],t:7,e:"FreeOpenSourceCdnSidebar"}," ",{p:[6,1,174],t:7,e:"div",a:{"class":"custom-cdn-for-open-source free-open-source-cdn"},f:[{p:[7,2,238],t:7,e:"div",a:{"class":"container"},f:[{p:[8,3,265],t:7,e:"div",a:{"class":"row"},f:[{p:[9,4,287],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-6 col-sm-18 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[10,5,384],t:7,e:"h1",f:["CDN and Web Performance Consultation Services"]}]}]}]}," ",{p:[15,2,473],t:7,e:"div",a:{"class":"container"},f:[{p:[16,3,500],t:7,e:"div",a:{"class":"row"},f:[{p:[17,4,522],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[18,5,619],t:7,e:"p",f:["You can now hire us to help you build and manage your own infrastructure. If web performance and uptime is important to you then we can help!"]}," ",{p:[22,5,788],t:7,e:"h3",f:["Services:"]}," ",{p:[24,5,814],t:7,e:"ul",a:{"class":"ul"},f:[{p:[25,6,836],t:7,e:"li",f:["Build a Multi-CDN system with a mix of enterprise CDNs and custom servers"]}," ",{p:[26,6,925],t:7,e:"li",f:["Long-term managing of existing infrastructure (retainer)"]}," ",{p:[27,6,997],t:7,e:"li",f:["Optimize existing servers and websites for better performance"]}," ",{p:[28,6,1074],t:7,e:"li",f:["Load-balancing and failover between servers and websites"]}," ",{p:[29,6,1146],t:7,e:"li",f:["Design and build own custom CDN (multiple options from cheap to super expensive)"]}," ",{p:[30,6,1242],t:7,e:"li",f:["AWS based hosting management"]}," ",{p:[31,6,1286],t:7,e:"li",f:["Speed optimization of custom PHP applications and CMS"]}," ",{p:[32,6,1355],t:7,e:"li",f:["Research, performance monitoring, big and small projects and much much more"]}," ",{p:[33,6,1446],t:7,e:"li",f:["We also sometimes build services and websites, but only if we really like you :)"]}]}," ",{p:[36,5,1554],t:7,e:"p",f:[{p:[37,6,1564],t:7,e:"strong",f:["We are here to help"]}," We are very friendly, feel free to contact us."]}," ",{p:[40,5,1665],t:7,e:"div",a:{"class":"contact-form-wrapper"},f:[{p:[41,6,1706],t:7,e:"h3",a:{"class":"text-center"},f:["Contact us"]}," ",{p:[43,6,1754],t:7,e:"form",a:{"class":"text-center"},f:[{p:[44,7,1788],t:7,e:"div",a:{"class":"row"},f:[{p:[45,8,1814],t:7,e:"div",a:{"class":"col-xs-8 col-xs-offset-4"},f:[{p:[46,9,1862],t:7,e:"input",a:{"class":"input",type:"text",value:[{t:2,r:"name",p:[46,49,1902]}],placeholder:"Your name"}}]}," ",{p:[49,8,1962],t:7,e:"div",a:{"class":"col-xs-8"},f:[{p:[50,9,1994],t:7,e:"input",a:{"class":"input",type:"email",value:[{t:2,r:"email",p:[50,50,2035]}],placeholder:"Your e-mail"}}]}]}," ",{p:[54,7,2111],t:7,e:"div",a:{"class":"row"},f:[{p:[55,8,2137],t:7,e:"div",a:{"class":"col-xs-16 col-xs-offset-4"},f:[{p:[56,9,2186],t:7,e:"textarea",a:{"class":"input",value:[{t:2,r:"message",p:[56,40,2217]}],placeholder:"Your message"}}]}]}," ",{t:4,f:["An error occurred while processing your request. Please try again later.",{p:[61,80,2401],t:7,e:"br"}],n:50,r:"error",p:[60,7,2307]}," ",{t:4,f:["Your message has been sent, and we'll get back to you soon."],n:50,r:"sent",p:[64,7,2436]},{t:4,n:51,f:[{p:[67,8,2541],t:7,e:"button",a:{"class":"btn btn-primary send-message-btn",disabled:[{t:2,x:{r:["name","email","message"],s:"!_0||!_1||!_2"},p:[67,112,2645]}]},v:{click:{m:"send",a:{r:["event","name","email","message"],s:"[_0,_1,_2,_3]"}}},f:[{p:[68,9,2688],t:7,e:"i",a:{"class":"fa fa-envelope"}},"Send message"]}],r:"sent"}]}]}]}]}]}]}]},
		components:{	Header: header}
	},
	cConsultationServices__component={},
	cConsultationServices____prop__,
	cConsultationServices____export__;


		cConsultationServices__component.exports = {
			data: function () {
				return {
					title: 'Consultation services - jsDelivr',
				};
			},
			send: function (event, name, email, message) {
				var _this = this;
				event.original.preventDefault();

				$.ajax({
					type: 'POST',
					url: '/api/mail',
					data: JSON.stringify({ page: 'consultation-services', name: name, email: email, message: message }),
					contentType: 'application/json',
					success: function () {
						_this.set('sent', true);
						_this.set('error', false);
					},
					error: function () {
						_this.set('error', true);
					},
				});

				return false;
			}
		};

	if ( typeof cConsultationServices__component.exports === "object" ) {
		for ( cConsultationServices____prop__ in cConsultationServices__component.exports ) {
			if ( cConsultationServices__component.exports.hasOwnProperty(cConsultationServices____prop__) ) {
				cConsultationServices____options__[cConsultationServices____prop__] = cConsultationServices__component.exports[cConsultationServices____prop__];
			}
		}
	}

	cConsultationServices____export__ = Ractive.extend( cConsultationServices____options__ );

	var cConsultationServices = cConsultationServices____export__;

	var sidebar____options__ = {
		template: {v:3,t:[{p:[1,1,0],t:7,e:"div",a:{"class":"sidebar"},f:[{p:[2,2,24],t:7,e:"ul",a:{"class":"nav nav-pills nav-stacked"},f:[{t:4,f:[{p:[4,4,86],t:7,e:"li",f:[{p:[4,8,90],t:7,e:"a",a:{href:[{t:2,r:"href",p:[4,17,99]}]},f:[{t:2,r:"name",p:[4,27,109]}]}]}],n:52,r:"links",p:[3,3,66]}]}]}]},
	},
	sidebar__component={},
	sidebar____prop__,
	sidebar____export__;


		sidebar__component.exports = {
			oncomplete: function () {
				this.findAll('a').forEach(function (a) {
					var $a = $(a);

					if (location.pathname.indexOf($a.attr('href')) === 0) {
						$a.addClass('active');
					} else {
						$a.removeClass('active');
					}
				});
			},
		};

	if ( typeof sidebar__component.exports === "object" ) {
		for ( sidebar____prop__ in sidebar__component.exports ) {
			if ( sidebar__component.exports.hasOwnProperty(sidebar____prop__) ) {
				sidebar____options__[sidebar____prop__] = sidebar__component.exports[sidebar____prop__];
			}
		}
	}

	sidebar____export__ = Ractive.extend( sidebar____options__ );

	var sidebar = sidebar____export__;

	var features_sidebar____options__ = {
		template: {v:3,t:[{p:[3,1,67],t:7,e:"Sidebar",a:{links:"[\n\t{ href: '/features/multi-cdn-load-balancing', name: 'Multi-CDN Load balancing' },\n\t{ href: '/features/jsdelivr-cdn-features', name: 'jsDelivr CDN features' },\n\t{ href: '/features/network-map', name: 'Network Map' },\n\t{ href: '/features/cdn-in-asia-and-china', name: 'CDN in Asia and China' }\n]"}}]},
		components:{	Sidebar: sidebar}
	},
	features_sidebar__component={},
	features_sidebar____prop__,
	features_sidebar____export__;


	if ( typeof features_sidebar__component.exports === "object" ) {
		for ( features_sidebar____prop__ in features_sidebar__component.exports ) {
			if ( features_sidebar__component.exports.hasOwnProperty(features_sidebar____prop__) ) {
				features_sidebar____options__[features_sidebar____prop__] = features_sidebar__component.exports[features_sidebar____prop__];
			}
		}
	}

	features_sidebar____export__ = Ractive.extend( features_sidebar____options__ );

	var features_sidebar = features_sidebar____export__;

	var cCdnInAsiaAndChina____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"FeaturesSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"cdn-in-asia-and-china features"},f:[{p:[8,2,271],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,298],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,320],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,417],t:7,e:"div",a:{"class":"category"},f:["Features"]}," ",{p:[15,5,474],t:7,e:"h1",f:["CDN in Asia and China"]}]}]}]}," ",{p:[20,2,539],t:7,e:"section",a:{"class":"section"},f:[{p:[21,3,568],t:7,e:"div",a:{"class":"container"},f:[{p:[22,4,596],t:7,e:"div",a:{"class":"row"},f:[{p:[23,5,619],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[24,6,717],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[25,7,758],t:7,e:"div",a:{"class":"col-sm-12 text-center"},f:[{p:[26,8,802],t:7,e:"img",a:{src:"/img/features/cdn-in-asia-and-china/map.png"}}]}," ",{p:[29,7,881],t:7,e:"div",a:{"class":"col-sm-12"},f:[{p:[30,8,913],t:7,e:"h2",f:["We have a ",{p:[30,22,927],t:7,e:"strong",f:["big network"]}," in China"]}," ",{p:[32,8,980],t:7,e:"p",f:["jsDelivr has partnered up with multiple Chinese companies to provide fast and reliable file delivery in China mainland and the whole Asian continent. We have servers inside China that improve the delivery speeds and latency significantly. Check our network map for the full list of locations. We also have a valid ICP license issued by the Chinese government that protects us from bans and slow downloads."]}," ",{p:[38,8,1440],t:7,e:"p",a:{"class":"cdn-in-asia-and-china-not-banned"},f:["We are ",{p:[39,16,1501],t:7,e:"strong",f:["not banned"]}," by the Chinese government."]}]}]}]}]}]}]}]}]},
		components:{	FeaturesSidebar: features_sidebar,
		Header: header}
	},
	cCdnInAsiaAndChina__component={},
	cCdnInAsiaAndChina____prop__,
	cCdnInAsiaAndChina____export__;


		cCdnInAsiaAndChina__component.exports = {
			data: function () {
				return {
					title: 'CDN in Asia and China - jsDelivr',
				};
			},
		};

	if ( typeof cCdnInAsiaAndChina__component.exports === "object" ) {
		for ( cCdnInAsiaAndChina____prop__ in cCdnInAsiaAndChina__component.exports ) {
			if ( cCdnInAsiaAndChina__component.exports.hasOwnProperty(cCdnInAsiaAndChina____prop__) ) {
				cCdnInAsiaAndChina____options__[cCdnInAsiaAndChina____prop__] = cCdnInAsiaAndChina__component.exports[cCdnInAsiaAndChina____prop__];
			}
		}
	}

	cCdnInAsiaAndChina____export__ = Ractive.extend( cCdnInAsiaAndChina____options__ );

	var cCdnInAsiaAndChina = cCdnInAsiaAndChina____export__;

	var cJsdelivrCdnFeatures____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"FeaturesSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"jsdelivr-cdn-features features"},f:[{p:[8,2,271],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,298],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,320],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,417],t:7,e:"div",a:{"class":"category"},f:["Features"]}," ",{p:[15,5,474],t:7,e:"h1",f:["jsDelivr CDN features"]}]}]}]}," ",{p:[20,2,539],t:7,e:"section",a:{"class":"section"},f:[{p:[21,3,568],t:7,e:"div",a:{"class":"container"},f:[{p:[22,4,596],t:7,e:"div",a:{"class":"row"},f:[{p:[23,5,619],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[24,6,717],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[25,7,758],t:7,e:"div",a:{"class":"col-xs-12"},f:[{p:[26,8,790],t:7,e:"h2",f:["MAXIMUM PERFORMANCE AND UPTIME"]}," ",{p:[28,8,840],t:7,e:"p",f:["Our public CDN is built with performance and reliability in mind. Everything is ",{p:[29,89,933],t:7,e:"strong",f:["optimized"]}," and being constantly improved to offer all users ",{p:[30,19,1018],t:7,e:"strong",f:["maximum speed and uptime"]},". Performance is monitored at all times, and we are always looking into new technologies and providers that may further improve our CDN."]}," ",{p:[35,8,1230],t:7,e:"p",f:["Downtime, timeouts and slow responses are simply unacceptable. The idea is not to simply offer a public CDN, but to offer the best possible experience and a rock-solid product ready to be used in production by any website."]}]}," ",{p:[41,7,1511],t:7,e:"div",a:{"class":"col-xs-12 text-center"},f:[{p:[42,8,1555],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/maximum-performance-and-uptime.png"}}]}]}]}]}]}]}," ",{p:[84,2,3058],t:7,e:"section",a:{"class":"section"},f:[{p:[85,3,3087],t:7,e:"div",a:{"class":"container"},f:[{p:[86,4,3115],t:7,e:"div",a:{"class":"row"},f:[{p:[87,5,3138],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-sm-18 col-sm-offset-3 col-xs-22 col-xs-offset-1"},f:[{p:[88,6,3236],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[89,7,3277],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[90,8,3320],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/version-aliasing.png"}}]}," ",{p:[93,7,3412],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[94,8,3455],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/automatic.png"}}]}," ",{p:[97,7,3540],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[98,8,3583],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/a-real-api.png"}}]}]}," ",{p:[102,6,3681],t:7,e:"div",a:{"class":"row row-same-height row-offset"},f:[{p:[103,7,3733],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[104,8,3776],t:7,e:"h2",f:["VERSION ALIASING"]}," ",{p:[106,8,3812],t:7,e:"p",a:{"class":"text-center"},f:["Every single project hosted by jsDelivr supports advanced features such as version aliasing. It allows people to use a dynamic URL and keep their websites up-to-date without changing anything. ",{p:[108,56,4047],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr#version-aliasing"},f:["Full documentation."]}]}]}," ",{p:[112,7,4171],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[113,8,4214],t:7,e:"h2",f:["AUTOMATED UPDATES"]}," ",{p:[115,8,4251],t:7,e:"p",a:{"class":"text-center"},f:["jsDelivr can automatically keep a project up-to-date as new versions are released, thanks to a bot called libgrabber that runs independently and scans for new versions of hosted projects every 30 minutes. ",{p:[118,9,4507],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr#auto-updating"},f:["Full documentation."]}]}]}," ",{p:[122,7,4628],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[123,8,4671],t:7,e:"h2",f:["A REAL API"]}," ",{p:[125,8,4701],t:7,e:"p",a:{"class":"text-center"},f:["You can request exactly what you need using our API without downloading a huge JSON package. And it also supports cdnjs, Google Hosted Libraries, and BootstrapCDN. This way developers have everything they need to build their applications. ",{p:[127,84,4982],t:7,e:"a",a:{href:"https://github.com/jsdelivr/api"},f:["Full documentation."]}]}]}]}]}]}]}]}," ",{p:[166,2,6658],t:7,e:"section",a:{"class":"section"},f:[{p:[167,3,6687],t:7,e:"div",a:{"class":"container"},f:[{p:[168,4,6715],t:7,e:"div",a:{"class":"row"},f:[{p:[169,5,6738],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[170,6,6836],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[171,7,6877],t:7,e:"div",a:{"class":"col-xs-12 text-center"},f:[{p:[172,8,6921],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/load-multiple-files.png"}}]}," ",{p:[175,7,7016],t:7,e:"div",a:{"class":"col-xs-12"},f:[{p:[176,8,7048],t:7,e:"h2",f:["LOAD MULTIPLE FILES"]}," ",{p:[178,8,7087],t:7,e:"p",f:["jsDelivr is the first CDN to support this kind of functionality. You can load multiple files using a ",{p:[179,110,7201],t:7,e:"strong",f:["single HTTP request"]},". It's similar to combining and minifying JavaScript files in your own server, but cached by the huge and smart network of jsDelivr."]}," ",{p:[182,8,7393],t:7,e:"p",f:["All you have to do is to build your own URL with the projects and files you want to combine and their versions if needed. ",{p:[184,9,7537],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr#load-multiple-files-with-single-http-request"},f:["Full documentation."]}]}]}]}]}]}]}]}," ",{p:[193,2,7743],t:7,e:"section",a:{"class":"section"},f:[{p:[194,3,7772],t:7,e:"div",a:{"class":"container"},f:[{p:[195,4,7800],t:7,e:"div",a:{"class":"row"},f:[{p:[196,5,7823],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-sm-18 col-sm-offset-3 col-xs-22 col-xs-offset-1"},f:[{p:[197,6,7921],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[198,7,7962],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[199,8,8005],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/https-and-spdy.png"}}]}," ",{p:[202,7,8095],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[203,8,8138],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/open-source.png"}}]}," ",{p:[206,7,8225],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[207,8,8268],t:7,e:"img",a:{src:"/img/features/jsdelivr-cdn-features/unlimited-traffic.png"}}]}]}," ",{p:[211,6,8373],t:7,e:"div",a:{"class":"row row-same-height row-offset"},f:[{p:[212,7,8425],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[213,8,8468],t:7,e:"h2",f:["HTTPS AND SPDY"]}," ",{p:[215,8,8502],t:7,e:"p",a:{"class":"text-center"},f:["Security is very important to all of us. Thats why all files are accessible via HTTPS with ",{p:[216,100,8626],t:7,e:"strong",f:["full SPDY support"]}," for better performance."]}]}," ",{p:[220,7,8721],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[221,8,8764],t:7,e:"h2",f:["OPEN SOURCE"]}," ",{p:[223,8,8795],t:7,e:"p",a:{"class":"text-center"},f:[{p:[224,9,8828],t:7,e:"strong",f:["jsDelivr is a non-profit project"]}," with all of our software open sourced and available at GitHub for anyone to use and contribute."]}]}," ",{p:[228,7,9010],t:7,e:"div",a:{"class":"col-xs-8 text-center"},f:[{p:[229,8,9053],t:7,e:"h2",f:["UNLIMITED TRAFFIC"]}," ",{p:[231,8,9090],t:7,e:"p",a:{"class":"text-center"},f:["Thanks to our sponsors, we have absolutely no traffic limits. Even if your website generates huge amounts of traffic ",{p:[232,126,9240],t:7,e:"strong",f:["every day"]},"."]}]}]}]}]}]}]}]}]},
		components:{	FeaturesSidebar: features_sidebar,
		Header: header}
	},
	cJsdelivrCdnFeatures__component={},
	cJsdelivrCdnFeatures____prop__,
	cJsdelivrCdnFeatures____export__;


		cJsdelivrCdnFeatures__component.exports = {
			data: function () {
				return {
					title: 'jsDelivr CDN features',
				};
			},
		};

	if ( typeof cJsdelivrCdnFeatures__component.exports === "object" ) {
		for ( cJsdelivrCdnFeatures____prop__ in cJsdelivrCdnFeatures__component.exports ) {
			if ( cJsdelivrCdnFeatures__component.exports.hasOwnProperty(cJsdelivrCdnFeatures____prop__) ) {
				cJsdelivrCdnFeatures____options__[cJsdelivrCdnFeatures____prop__] = cJsdelivrCdnFeatures__component.exports[cJsdelivrCdnFeatures____prop__];
			}
		}
	}

	cJsdelivrCdnFeatures____export__ = Ractive.extend( cJsdelivrCdnFeatures____options__ );

	var cJsdelivrCdnFeatures = cJsdelivrCdnFeatures____export__;

	var cMultiCdnLoadBalancing____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"FeaturesSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"multi-cdn-load-balancing features"},f:[{p:[8,2,274],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,301],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,323],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,420],t:7,e:"div",a:{"class":"category"},f:["Features"]}," ",{p:[15,5,477],t:7,e:"h1",f:["Multi-CDN Load balancing"]}]}]}]}," ",{p:[20,2,545],t:7,e:"section",a:{"class":"section"},f:[{p:[21,3,574],t:7,e:"div",a:{"class":"container"},f:[{p:[22,4,602],t:7,e:"div",a:{"class":"row"},f:[{p:[23,5,625],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[24,6,723],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[25,7,764],t:7,e:"div",a:{"class":"col-xs-12"},f:[{p:[26,8,796],t:7,e:"h2",f:["Global load balancing"]}," ",{p:[28,8,837],t:7,e:"p",f:["Unlike the competition, jsDelivr uses a unique Multi-CDN infrastructure to offer the best possible uptime and performance. The main backbone of it is built on top of CDN networks provided by MaxCDN, CloudFlare, KeyCDN and Quantil."]}," ",{p:[31,8,1102],t:7,e:"p",f:["We also use custom servers in locations where CDNs have little or no presence. In total at this moment this results in 98 global POP locations. In the future we plan to add even more locations to offer top performance even in less popular countries."]}," ",{p:[34,8,1386],t:7,e:"p",f:["Our smart load balancing system ensures not only best possible performance but also the best possible uptime. We have multiple levels of failover and a diverse uptime monitoring system that will catch any downtime or issues and instantly redirect all traffic."]}," ",{p:[37,8,1680],t:7,e:"p",f:["Every user gets a unique response that is based on their location and ISP. Each time a users requests to download a file from jsDelivr, our algorithm extracts the performance and availability data it has available for the last few minutes and figures out the optimal provider for that particular user and that particular time. All that happens in a few milliseconds."]}," ",{p:[40,8,2081],t:7,e:"p",f:["This algorithm also immediately responds to performance degradation. For example, if a CDN provider gets DDoSed in Europe and their response times increase, jsDelivr will pick up the change and simply stop using this provider in Europe but still consider it for users in USA and other locations that were not affected by the attack."]}," ",{p:[43,8,2448],t:7,e:"p",f:["Jealous? We can build a similar system for you. We offer ",{p:[44,66,2518],t:7,e:"a",a:{href:"/consultation-services"},f:["CDN and web peformance consultation services."]}]}]}," ",{p:[48,7,2637],t:7,e:"div",a:{"class":"col-xs-12 text-center"},f:[{p:[49,8,2681],t:7,e:"img",a:{src:"/img/features/multi-cdn-load-balancing/global-load-balancing.png"}}]}]}]}]}]}]}," ",{p:[57,2,2835],t:7,e:"section",a:{"class":"section"},f:[{p:[58,3,2864],t:7,e:"div",a:{"class":"container"},f:[{p:[59,4,2892],t:7,e:"div",a:{"class":"row"},f:[{p:[60,5,2915],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[61,6,3013],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[62,7,3054],t:7,e:"div",a:{"class":"col-xs-12 text-center"},f:[{p:[63,8,3098],t:7,e:"img",a:{src:"/img/features/multi-cdn-load-balancing/real-time-data-monitoring.png"}}]}," ",{p:[66,7,3202],t:7,e:"div",a:{"class":"col-xs-12"},f:[{p:[67,8,3234],t:7,e:"h2",f:["Real-time CDN monitoring"]}," ",{p:[69,8,3278],t:7,e:"p",f:["Our load balancing is based on real time performance data that ",{p:[70,72,3354],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/"},f:["Cedexis"]}," gathers on all major CDN providers. 1.3 billion RUM (Real User Metrics) performance tests per day are processed and made available to us."]}," ",{p:[72,8,3575],t:7,e:"p",f:["To gather these RUM tests, a special JavaScript code was deployed on thousands of websites. Every visitor to one of these websites executes the code and starts testing different CDN providers in the background as they browse the website. You can even do it yourself and ",{p:[73,279,3858],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr#contribute-performance-data"},f:["help jsDelivr with valuable data"]},". The beauty of these tests is that they are not synthetic. They reflect the real performance real users will get if they download a file from one of those CDNs."]}," ",{p:[76,8,4161],t:7,e:"p",f:["On top of the RUM uptime information we also use 2 synthetic uptime monitors to monitor all of our providers. This guarantees instant downtime detection and instant failover. This uptime information is pulled every single time a user makes a request to cdn.jsdelivr.net, and if any of the monitors reports problems that provider is removed from consideration."]}," ",{p:[80,8,4564],t:7,e:"p",f:["As an additional failover layer we are also monitoring our load balancing provider and if for any reason the load-balancer itself fails, all traffic will be automatically switched to a single CDN provider. This happens automatically on the DNS level and it's the last resort to ensure our uptime."]}]}]}]}]}]}]}," ",{p:[90,2,4964],t:7,e:"section",a:{"class":"section"},f:[{p:[91,3,4993],t:7,e:"div",a:{"class":"container"},f:[{p:[92,4,5021],t:7,e:"div",a:{"class":"row"},f:[{p:[93,5,5044],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[94,6,5142],t:7,e:"div",a:{"class":"row row-same-height"},f:[{p:[95,7,5183],t:7,e:"div",a:{"class":"col-xs-12"},f:[{p:[96,8,5215],t:7,e:"h2",f:["Infinite options"]}," ",{p:[98,8,5251],t:7,e:"p",f:["Due to its nature jsDelivr was built to be able to switch infrastructure at a minutes notice. We are using the best available services out there and unlike our competition we NEVER vendor lock to any technology, service, or company. If a sponsor pulls its sponsorship or makes unreasonable demands then we can simply switch to a different provider. We maintain 100% control of the project without giving away any power or influence to corporations."]}," ",{p:[101,8,5734],t:7,e:"p",f:["Thanks to this we have infinite options and freedom available to us. We use multiple providers in multiple countries and can switch any of them whenever it's needed for the benefit of our users."]}]}," ",{p:[106,7,5978],t:7,e:"div",a:{"class":"col-xs-12 text-center"},f:[{p:[107,8,6022],t:7,e:"img",a:{src:"/img/features/multi-cdn-load-balancing/automatic-cdn-switch.png"}}]}]}]}]}]}]}]}]},
		components:{	FeaturesSidebar: features_sidebar,
		Header: header}
	},
	cMultiCdnLoadBalancing__component={},
	cMultiCdnLoadBalancing____prop__,
	cMultiCdnLoadBalancing____export__;


		cMultiCdnLoadBalancing__component.exports = {
			data: function () {
				return {
					title: 'Multi-CDN Load balancing - jsDelivr',
				};
			},
		};

	if ( typeof cMultiCdnLoadBalancing__component.exports === "object" ) {
		for ( cMultiCdnLoadBalancing____prop__ in cMultiCdnLoadBalancing__component.exports ) {
			if ( cMultiCdnLoadBalancing__component.exports.hasOwnProperty(cMultiCdnLoadBalancing____prop__) ) {
				cMultiCdnLoadBalancing____options__[cMultiCdnLoadBalancing____prop__] = cMultiCdnLoadBalancing__component.exports[cMultiCdnLoadBalancing____prop__];
			}
		}
	}

	cMultiCdnLoadBalancing____export__ = Ractive.extend( cMultiCdnLoadBalancing____options__ );

	var cMultiCdnLoadBalancing = cMultiCdnLoadBalancing____export__;

	var cNetworkMap____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"FeaturesSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"network-map features"},f:[{p:[8,2,261],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,288],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,310],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,407],t:7,e:"div",a:{"class":"category"},f:["Features"]}," ",{p:[15,5,464],t:7,e:"h1",f:["Network Map"]}," ",{p:[16,5,490],t:7,e:"h3",f:["Over 90 POP Locations all over the world"]}," ",{p:[18,5,547],t:7,e:"iframe",a:{src:"https://a.tiles.mapbox.com/v4/jimaek.map-6gmedxyr/attribution,zoompan.html?access_token=pk.eyJ1IjoiamltYWVrIiwiYSI6IkRnYjJWSDgifQ.HKcp_zscAIS0gtR4mHOoeQ#2/19.5/14.1"}}]}]}]}]}]},
		components:{	FeaturesSidebar: features_sidebar,
		Header: header}
	},
	cNetworkMap__component={},
	cNetworkMap____prop__,
	cNetworkMap____export__;


		cNetworkMap__component.exports = {
			data: function () {
				return {
					title: 'Network Map - jsDelivr',
				};
			},
		};

	if ( typeof cNetworkMap__component.exports === "object" ) {
		for ( cNetworkMap____prop__ in cNetworkMap__component.exports ) {
			if ( cNetworkMap__component.exports.hasOwnProperty(cNetworkMap____prop__) ) {
				cNetworkMap____options__[cNetworkMap____prop__] = cNetworkMap__component.exports[cNetworkMap____prop__];
			}
		}
	}

	cNetworkMap____export__ = Ractive.extend( cNetworkMap____options__ );

	var cNetworkMap = cNetworkMap____export__;

	var free_open_source_cdn_sidebar____options__ = {
		template: {v:3,t:[{p:[3,1,67],t:7,e:"Sidebar",a:{links:"[\n\t{ href: '/free-open-source-cdn/javascript-cdn', name: 'Javascript CDN' },\n\t{ href: '/free-open-source-cdn/custom-cdn-for-open-source', name: 'Custom CDN for Open Source' }\n]"}}]},
		components:{	Sidebar: sidebar}
	},
	free_open_source_cdn_sidebar__component={},
	free_open_source_cdn_sidebar____prop__,
	free_open_source_cdn_sidebar____export__;


	if ( typeof free_open_source_cdn_sidebar__component.exports === "object" ) {
		for ( free_open_source_cdn_sidebar____prop__ in free_open_source_cdn_sidebar__component.exports ) {
			if ( free_open_source_cdn_sidebar__component.exports.hasOwnProperty(free_open_source_cdn_sidebar____prop__) ) {
				free_open_source_cdn_sidebar____options__[free_open_source_cdn_sidebar____prop__] = free_open_source_cdn_sidebar__component.exports[free_open_source_cdn_sidebar____prop__];
			}
		}
	}

	free_open_source_cdn_sidebar____export__ = Ractive.extend( free_open_source_cdn_sidebar____options__ );

	var free_open_source_cdn_sidebar = free_open_source_cdn_sidebar____export__;

	var cCustomCdn____options__ = {
		template: {v:3,t:[{p:[4,1,143],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,156]}],query:[{t:2,r:"query",p:[4,30,172]}]}}," ",{p:[5,1,194],t:7,e:"FreeOpenSourceCdnSidebar"}," ",{p:[7,1,251],t:7,e:"div",a:{"class":"custom-cdn-for-open-source free-open-source-cdn"},f:[{p:[8,2,315],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,342],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,364],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-6 col-sm-18 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,461],t:7,e:"div",a:{"class":"category"},f:["Free Open Source CDN"]}," ",{p:[15,5,530],t:7,e:"h1",f:["Custom CDN Hosting"]}]}]}]}," ",{p:[20,2,592],t:7,e:"div",a:{"class":"container"},f:[{p:[21,3,619],t:7,e:"div",a:{"class":"row"},f:[{p:[22,4,641],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[23,5,738],t:7,e:"p",f:["If your project does not qualify to be hosted in GitHub or you need direct access to your files, it's not a problem! We can work together and set up a custom configuration for your project. This way, you can have full control over your files, without the restrictions of GitHub, and the ability to utilize the full power of jsDelivr."]}," ",{p:[29,5,1111],t:7,e:"h3",f:["Suitable for:"]}," ",{p:[31,5,1141],t:7,e:"ul",a:{"class":"ul"},f:[{p:[32,6,1163],t:7,e:"li",f:["Binary hosting. Windows executable files and zips"]}," ",{p:[33,6,1228],t:7,e:"li",f:["Frequently updated files"]}," ",{p:[34,6,1268],t:7,e:"li",f:["Projects that can't follow jsDelivr file structure"]}]}," ",{p:[37,5,1346],t:7,e:"p",f:[{p:[38,6,1356],t:7,e:"strong",f:["jsDelivr is here to help and not to limit."]}," Even if what you need is not listed above, feel free to contact us."]}," ",{p:[41,5,1501],t:7,e:"div",a:{"class":"contact-form-wrapper"},f:[{p:[42,6,1542],t:7,e:"h3",a:{"class":"text-center"},f:["Contact us"]}," ",{p:[44,6,1590],t:7,e:"form",a:{"class":"text-center"},f:[{p:[45,7,1624],t:7,e:"div",a:{"class":"row"},f:[{p:[46,8,1650],t:7,e:"div",a:{"class":"col-xs-8 col-xs-offset-4"},f:[{p:[47,9,1698],t:7,e:"input",a:{"class":"input",type:"text",value:[{t:2,r:"name",p:[47,49,1738]}],placeholder:"Your name"}}]}," ",{p:[50,8,1798],t:7,e:"div",a:{"class":"col-xs-8"},f:[{p:[51,9,1830],t:7,e:"input",a:{"class":"input",type:"email",value:[{t:2,r:"email",p:[51,50,1871]}],placeholder:"Your e-mail"}}]}]}," ",{p:[55,7,1947],t:7,e:"div",a:{"class":"row"},f:[{p:[56,8,1973],t:7,e:"div",a:{"class":"col-xs-16 col-xs-offset-4"},f:[{p:[57,9,2022],t:7,e:"textarea",a:{"class":"input",value:[{t:2,r:"message",p:[57,40,2053]}],placeholder:"Your message"}}]}]}," ",{t:4,f:["An error occurred while processing your request. Please try again later.",{p:[62,80,2237],t:7,e:"br"}],n:50,r:"error",p:[61,7,2143]}," ",{t:4,f:["Your message has been sent, and we'll get back to you soon."],n:50,r:"sent",p:[65,7,2272]},{t:4,n:51,f:[{p:[68,8,2377],t:7,e:"button",a:{"class":"btn btn-primary send-message-btn",disabled:[{t:2,x:{r:["name","email","message"],s:"!_0||!_1||!_2"},p:[68,112,2481]}]},v:{click:{m:"send",a:{r:["event","name","email","message"],s:"[_0,_1,_2,_3]"}}},f:[{p:[69,9,2524],t:7,e:"i",a:{"class":"fa fa-envelope"}},"Send message"]}],r:"sent"}]}]}]}]}]}]}]},
		components:{	FreeOpenSourceCdnSidebar: free_open_source_cdn_sidebar,
		Header: header}
	},
	cCustomCdn__component={},
	cCustomCdn____prop__,
	cCustomCdn____export__;


		cCustomCdn__component.exports = {
			data: function () {
				return {
					title: 'Custom CDN Hosting - jsDelivr',
				};
			},
			send: function (event, name, email, message) {
				var _this = this;
				event.original.preventDefault();

				$.ajax({
					type: 'POST',
					url: '/api/mail',
					data: JSON.stringify({ page: 'custom-cdn', name: name, email: email, message: message }),
					contentType: 'application/json',
					success: function () {
						_this.set('sent', true);
						_this.set('error', false);
					},
					error: function () {
						_this.set('error', true);
					},
				});

				return false;
			}
		};

	if ( typeof cCustomCdn__component.exports === "object" ) {
		for ( cCustomCdn____prop__ in cCustomCdn__component.exports ) {
			if ( cCustomCdn__component.exports.hasOwnProperty(cCustomCdn____prop__) ) {
				cCustomCdn____options__[cCustomCdn____prop__] = cCustomCdn__component.exports[cCustomCdn____prop__];
			}
		}
	}

	cCustomCdn____export__ = Ractive.extend( cCustomCdn____options__ );

	var cCustomCdn = cCustomCdn____export__;

	var cJavascriptCdn____options__ = {
		template: {v:3,t:[{p:[4,1,143],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,156]}],query:[{t:2,r:"query",p:[4,30,172]}]}}," ",{p:[5,1,194],t:7,e:"FreeOpenSourceCdnSidebar"}," ",{p:[7,1,251],t:7,e:"div",a:{"class":"javascript-cdn free-open-source-cdn"},f:[{p:[8,2,303],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,330],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,352],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-6 col-sm-18 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,449],t:7,e:"div",a:{"class":"category"},f:["Free Open Source CDN"]}," ",{p:[15,5,518],t:7,e:"h1",f:["jsDelivr JavaScript CDN — The advanced open source public CDN"]}]}]}]}," ",{p:[20,2,623],t:7,e:"div",a:{"class":"container"},f:[{p:[21,3,650],t:7,e:"div",a:{"class":"row"},f:[{p:[22,4,672],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-20 col-xs-offset-2"},f:[{p:[23,5,769],t:7,e:"p",f:["As a developer, you are probably aware of ",{p:[24,48,821],t:7,e:"a",a:{href:"https://developers.google.com/speed/libraries/"},f:["Google Hosted Libraries"]},". Google offers an easy and fast way to include 14 popular JavaScript libraries in your websites."]}," ",{p:[28,5,1026],t:7,e:"p",f:["But what if you are a webmaster and you want take advantage of a fast CDN with other less popular projects too? Or if you are a developer and you want to make your project easier to access and use by other users?"]}," ",{p:[33,5,1272],t:7,e:"p",f:["This is where ",{p:[34,20,1296],t:7,e:"a",a:{href:"/"},f:["jsDelivr"]}," comes into play. jsDelivr is a free and open source CDN created to help developers and webmasters. There are no popularity restrictions and all kinds of files are allowed, including JavaScript libraries, jQuery plugins, CSS frameworks, fonts and more."]}," ",{p:[38,5,1596],t:7,e:"img",a:{src:"/img/free-open-source-cdn/javascript-cdn/map.png","class":"javascript-cdn-map"}}," ",{p:[40,5,1691],t:7,e:"h3",f:["Adding a library"]}," ",{p:[42,5,1724],t:7,e:"ol",a:{"class":"ol"},f:[{p:[43,6,1746],t:7,e:"li",f:[{p:[44,7,1758],t:7,e:"strong",f:["To add a new library or update an existing one, all the developer has to do"]}," is to use GitHub's web interface to add 2 files to our repository with the modifications they see fit. Once a moderator reviews the pull request and merges it, the files become instantly available from the official website."]}," ",{p:[49,6,2109],t:7,e:"li",f:[{p:[50,7,2121],t:7,e:"strong",f:["If a moderator is online, the approval should not take"]}," more than 20 minutes. However, it can take up to 10 hours until someone comes online. For existing projects, updates are auto-merged by our bot if they pass all the tests."]}]}]}]}]}]}]},
		components:{	FreeOpenSourceCdnSidebar: free_open_source_cdn_sidebar,
		Header: header}
	},
	cJavascriptCdn__component={},
	cJavascriptCdn____prop__,
	cJavascriptCdn____export__;


		cJavascriptCdn__component.exports = {
			data: function () {
				return {
					title: 'JavaScript CDN - jsDelivr',
				};
			},
		};

	if ( typeof cJavascriptCdn__component.exports === "object" ) {
		for ( cJavascriptCdn____prop__ in cJavascriptCdn__component.exports ) {
			if ( cJavascriptCdn__component.exports.hasOwnProperty(cJavascriptCdn____prop__) ) {
				cJavascriptCdn____options__[cJavascriptCdn____prop__] = cJavascriptCdn__component.exports[cJavascriptCdn____prop__];
			}
		}
	}

	cJavascriptCdn____export__ = Ractive.extend( cJavascriptCdn____options__ );

	var cJavascriptCdn = cJavascriptCdn____export__;

	var version_dropdown____options__ = {
		template: {v:3,t:[{p:[1,1,0],t:7,e:"div",a:{"class":"version-dropdown btn-group"},f:[{t:4,f:[{p:[3,3,80],t:7,e:"span",a:{"class":"clickable version-dropdown-selected-version","data-toggle":"dropdown"},f:[{p:[4,4,165],t:7,e:"a",f:[{t:2,r:"project.selectedVersion",p:[4,7,168]}]}," ",{p:[5,4,203],t:7,e:"i",a:{"class":"fa fa-chevron-down"}}]}," ",{p:[8,3,251],t:7,e:"ul",a:{"class":"dropdown-menu"},f:[{t:4,f:[{t:4,f:[{p:[11,6,358],t:7,e:"li",f:[{p:[11,10,362],t:7,e:"a",a:{"class":"clickable"},v:{click:{m:"set",a:{r:["."],s:"[\"project.selectedVersion\",_0]"}}},f:[{t:2,r:".",p:[11,79,431]}]}]}],n:50,x:{r:[".","project.selectedVersion"],s:"_0!==_1"},p:[10,5,312]}],n:52,r:"project.versions",p:[9,4,281]}]}],n:50,x:{r:["project.versions.length"],s:"_0>1"},p:[2,2,42]},{t:4,n:51,f:[{p:[16,3,511],t:7,e:"span",a:{"class":"version-dropdown-selected-version"},f:[{p:[17,4,563],t:7,e:"a",f:[{t:2,r:"project.selectedVersion",p:[17,7,566]}]}]}],x:{r:["project.versions.length"],s:"_0>1"}}]}]},
	},
	version_dropdown__component={},
	version_dropdown____prop__,
	version_dropdown____export__;


	if ( typeof version_dropdown__component.exports === "object" ) {
		for ( version_dropdown____prop__ in version_dropdown__component.exports ) {
			if ( version_dropdown__component.exports.hasOwnProperty(version_dropdown____prop__) ) {
				version_dropdown____options__[version_dropdown____prop__] = version_dropdown__component.exports[version_dropdown____prop__];
			}
		}
	}

	version_dropdown____export__ = Ractive.extend( version_dropdown____options__ );

	var version_dropdown = version_dropdown____export__;

	"use strict";

	var get_files_by_version = function (project, version) {
		// 1. main file
		// 2. min files
		// 3. other files
		// 4. map files
		return project.assets.filter(function (assets) {
			return assets.version === version;
		})[0].files.sort(function (a, b) {
			if (a === project.mainfile || /\.map$/i.test(b)) {
				return -1;
			}

			if (b === project.mainfile || /\.map$/i.test(a)) {
				return 1;
			}

			if (/[._-]min./i.test(a)) {
				if (/[._-]min./i.test(b)) {
					return a > b || -1;
				}

				return -1;
			}

			if (/[._-]min./i.test(b)) {
				return 1;
			}

			return a > b || -1;
		});
	}

	"use strict";

	var __import2__ = function (collection, project) {
		var version = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
		var file = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

		for (var i = 0; i < collection.length; i++) {
			if (collection[i].project === project && (!version || collection[i].version === version) && (!file || collection[i].name === file)) {
				return i;
			}
		}

		return -1;
	}

	'use strict';

	var __import3__ = function (node, title) {
		var placement = arguments.length <= 2 || arguments[2] === undefined ? 'top' : arguments[2];
		var trigger = arguments.length <= 3 || arguments[3] === undefined ? 'hover' : arguments[3];
		var container = arguments.length <= 4 || arguments[4] === undefined ? 'body' : arguments[4];

		var $node = $(node).tooltip({
			title: title,
			placement: placement,
			trigger: trigger,
			container: container
		});

		return {
			teardown: function teardown() {
				$node.tooltip('destroy');
			}
		};
	}

	'use strict';

	var __import4__ = function (node) {
		var $node = $(node);
		var selection = window.getSelection();
		var select = function select() {
			if (!selection.toString()) {
				if ($node[0].nodeName.toLowerCase() === 'input') {
					$node.select();
				} else {
					selection.selectAllChildren(node);
				}
			}
		};

		$node.on('click', select);

		return {
			teardown: function teardown() {
				$node.off('click', select);
			}
		};
	}

	var shared_project____options__ = {
		template: {v:3,t:[{t:4,f:[{p:[4,2,98],t:7,e:"div",a:{"class":"project"},f:[{p:[5,3,123],t:7,e:"div",a:{"class":"project-header"},f:[{p:[6,4,156],t:7,e:"div",a:{"class":"row"},f:[{p:[7,5,179],t:7,e:"div",a:{"class":"col-sm-7"},f:[{p:[8,6,208],t:7,e:"div",a:{"class":"project-github"},f:[{t:4,f:[{p:[9,21,258],t:7,e:"a",a:{href:[{t:2,r:"github",p:[9,30,267]}],target:"_blank"},f:[{p:[9,58,295],t:7,e:"i",a:{"class":"fa fa-github"}},{t:2,r:"author",p:[9,86,323]}]}],n:50,r:"github",p:[9,7,244]},{t:4,n:51,f:[{t:2,r:"author",p:[9,108,345]}],r:"github"}]}," ",{p:[12,6,391],t:7,e:"div",a:{"class":"project-name"},f:[{p:[13,7,425],t:7,e:"h3",f:[{p:[13,11,429],t:7,e:"a",a:{href:["/projects/",{t:2,r:"name",p:[13,30,448]}]},f:[{t:2,r:"name",p:[13,40,458]}]}]}]}]}," ",{p:[17,5,508],t:7,e:"div",a:{"class":"col-sm-9 text-justify"},f:[{p:[18,6,550],t:7,e:"div",a:{"class":"version-dropdown-wrapper"},f:[{p:[19,7,596],t:7,e:"VersionDropdown",a:{project:[{t:2,r:".",p:[19,33,622]}]}}]}," ",{t:2,r:"description",p:[22,6,672]}]}," ",{p:[25,5,707],t:7,e:"div",a:{"class":"col-sm-8"},f:[{p:[26,6,736],t:7,e:"div",a:{"class":"project-links"},f:[{p:[27,7,771],t:7,e:"button",a:{"class":["btn btn-default btn-icon",{t:4,f:[" btn-checked"],n:50,x:{r:["getCollectionIndex","collection","name"],s:"~_0(_1,_2)"},p:[27,46,810]}]},v:{click:{m:"toggleCollectionProject",a:{r:[],s:"[]"}}},o:{n:"tooltip",a:"Add to Collection"},f:[{p:[28,8,961],t:7,e:"i",a:{"class":["fa ",{t:2,x:{r:["getCollectionIndex","collection","name"],s:"~_0(_1,_2)?\"fa-check-circle\":\"fa-plus-circle\""},p:[28,21,974]}]}}]}," ",{p:[31,7,1088],t:7,e:"a",a:{"class":"btn btn-default btn-icon",href:[{t:2,r:"apiRoot",p:[31,49,1130]},"/jsdelivr/libraries?name=",{t:2,r:"name",p:[31,85,1166]}],target:"_blank"},o:{n:"tooltip",a:"API"},f:[{p:[31,136,1217],t:7,e:"i",a:{"class":"fa fa-cog"}}]}," ",{p:[32,7,1254],t:7,e:"a",a:{"class":"btn btn-default btn-icon",href:[{t:2,r:"homepage",p:[32,49,1296]}],target:"_blank"},o:{n:"tooltip",a:"Homepage"},f:[{p:[32,109,1356],t:7,e:"i",a:{"class":"fa fa-link"}}]}]}]}]}]}," ",{p:[38,3,1438],t:7,e:"div",a:{"class":"project-files-header"},f:[{p:[39,4,1477],t:7,e:"div",a:{"class":"row"},f:[{p:[40,5,1500],t:7,e:"div",a:{"class":"col-xs-7"},f:[{p:[41,6,1529],t:7,e:"b",f:["CDN files"]}]}," ",{p:[44,5,1565],t:7,e:"div",a:{"class":"col-xs-10"},f:[{p:[45,6,1595],t:7,e:"div",a:{"class":"project-files-header-link"},f:["mainfile: ",{p:[46,17,1652],t:7,e:"a",a:{href:[{t:2,r:"cdnRoot",p:[46,26,1661]},"/",{t:2,r:"name",p:[46,38,1673]},"/",{t:2,r:"selectedVersion",p:[46,47,1682]},"/",{t:2,r:"mainfile",p:[46,67,1702]}],target:"_blank"},f:[{p:[46,97,1732],t:7,e:"i",a:{"class":"fa fa-file-text-o"}},{t:2,r:"mainfile",p:[46,130,1765]}]}]}," ",{p:[49,6,1803],t:7,e:"div",a:{"class":"project-files-header-link"},f:["download: ",{p:[50,17,1860],t:7,e:"a",a:{href:[{t:2,r:"cdnRoot",p:[50,26,1869]},"/",{t:2,r:"name",p:[50,38,1881]},"/",{t:2,r:"selectedVersion",p:[50,47,1890]},"/",{t:2,r:"name",p:[50,67,1910]},".zip"]},f:[{p:[50,81,1924],t:7,e:"i",a:{"class":"fa fa-download"}},"ZIP"]}]}]}," ",{p:[54,5,1994],t:7,e:"div",a:{"class":"col-xs-7"},f:[{p:[55,6,2023],t:7,e:"b",f:["Add"]}]}]}]}," ",{t:4,f:[{p:[61,4,2147],t:7,e:"div",a:{"class":["project-file ",{t:4,f:["project-file-selected"],n:50,x:{r:["getCollectionIndex","collection","project.name","project.selectedVersion","."],s:"~_0(_1,_2,_3,_4)"},p:[61,29,2172]}]},f:[{p:[62,5,2292],t:7,e:"div",a:{"class":"row"},f:[{p:[63,6,2316],t:7,e:"div",a:{"class":"col-xs-17"},f:[{p:[64,7,2347],t:7,e:"span",o:"select",f:[{t:2,r:"cdnRoot",p:[64,32,2372]},"/",{t:2,r:"name",p:[64,44,2384]},"/",{t:2,r:"selectedVersion",p:[64,53,2393]},"/",{t:2,r:".",p:[64,73,2413]}]}]}," ",{p:[67,6,2450],t:7,e:"div",a:{"class":"col-xs-7"},f:[{p:[68,7,2480],t:7,e:"input",a:{type:"checkbox","class":"switch-inline",id:[{t:2,r:"name",p:[68,56,2529]},"/",{t:2,r:"selectedVersion",p:[68,65,2538]},"/",{t:2,r:".",p:[68,85,2558]}],twoway:"false",checked:[{t:2,x:{r:["getCollectionIndex","collection","project.name","project.selectedVersion","."],s:"~_0(_1,_2,_3,_4)"},p:[69,18,2601]}]},v:{click:{m:"toggleCollectionFile",a:{r:["."],s:"[_0]"}}}}," ",{p:[70,7,2729],t:7,e:"label",a:{"for":[{t:2,r:"name",p:[70,19,2741]},"/",{t:2,r:"selectedVersion",p:[70,28,2750]},"/",{t:2,r:".",p:[70,48,2770]}]}}]}]}]}],n:52,x:{r:["getFilesByVersion",".","selectedVersion","fileLimit"],s:"_0(_1,_2).slice(0,_3)"},p:[60,3,2072]}," ",{t:4,f:[{p:[77,4,2875],t:7,e:"div",t0:"slide",f:[{t:4,f:[{p:[79,6,2980],t:7,e:"div",a:{"class":["project-file ",{t:4,f:["project-file-selected"],n:50,x:{r:["getCollectionIndex","collection","project.name","project.selectedVersion","."],s:"~_0(_1,_2,_3,_4)"},p:[79,31,3005]}]},f:[{p:[80,7,3127],t:7,e:"div",a:{"class":"row"},f:[{p:[81,8,3153],t:7,e:"div",a:{"class":"col-xs-17"},f:[{p:[82,9,3186],t:7,e:"span",o:"select",f:[{t:2,r:"cdnRoot",p:[82,34,3211]},"/",{t:2,r:"name",p:[82,46,3223]},"/",{t:2,r:"selectedVersion",p:[82,55,3232]},"/",{t:2,r:".",p:[82,75,3252]}]}]}," ",{p:[85,8,3293],t:7,e:"div",a:{"class":"col-xs-7"},f:[{p:[86,9,3325],t:7,e:"input",a:{type:"checkbox","class":"switch-inline",id:[{t:2,r:"name",p:[86,58,3374]},"/",{t:2,r:"selectedVersion",p:[86,67,3383]},"/",{t:2,r:".",p:[86,87,3403]}],twoway:"false",checked:[{t:2,x:{r:["getCollectionIndex","collection","project.name","project.selectedVersion","."],s:"~_0(_1,_2,_3,_4)"},p:[87,20,3448]}]},v:{click:{m:"toggleCollectionFile",a:{r:["."],s:"[_0]"}}}}," ",{p:[88,9,3578],t:7,e:"label",a:{"for":[{t:2,r:"name",p:[88,21,3590]},"/",{t:2,r:"selectedVersion",p:[88,30,3599]},"/",{t:2,r:".",p:[88,50,3619]}]}}]}]}]}],n:52,x:{r:["getFilesByVersion",".","selectedVersion","fileLimit"],s:"_0(_1,_2).slice(_3)"},p:[78,5,2906]}]}],n:50,r:"showMoreFiles",p:[76,3,2849]}," ",{t:4,f:[{p:[97,4,3814],t:7,e:"div",a:{"class":"project-footer"},f:[{p:[98,5,3848],t:7,e:"span",a:{"class":"clickable"},v:{click:{m:"toggleShowMoreFiles",a:{r:[],s:"[]"}}},f:[" ",{t:4,f:[{p:[101,7,4034],t:7,e:"i",a:{"class":"fa fa-circle"}}," ",{p:[101,36,4063],t:7,e:"i",a:{"class":"fa fa-circle"}}," ",{p:[101,65,4092],t:7,e:"i",a:{"class":"fa fa-circle"}},"Show more"],n:50,x:{r:["showMoreFiles"],s:"!_0"},p:[100,6,4004]},{t:4,n:51,f:[{p:[103,7,4152],t:7,e:"i",a:{"class":"fa fa-circle"}}," ",{p:[103,36,4181],t:7,e:"i",a:{"class":"fa fa-circle"}},"Show less"],x:{r:["showMoreFiles"],s:"!_0"}}]}]}],n:50,x:{r:["getFilesByVersion",".","selectedVersion","fileLimit"],s:"_0(_1,_2).length>_3"},p:[96,3,3742]}]}],n:53,r:"project",p:[3,1,78]}]},
		components:{	VersionDropdown: version_dropdown}
	},
	shared_project__component={},
	shared_project____prop__,
	shared_project____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/get-files-by-version': get_files_by_version,
			'public/js/utils/get-collection-index': __import2__,
			'public/js/decorators/tooltip': __import3__,
			'public/js/decorators/select': __import4__
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		var getFilesByVersion = require('public/js/utils/get-files-by-version');
		var getCollectionIndex = require('public/js/utils/get-collection-index');
		var tooltipDecorator = require('public/js/decorators/tooltip');
		var selectDecorator = require('public/js/decorators/select');

		shared_project__component.exports = {
			noIntro: true,
			computed: {
				fileLimit: function () {
					return this.get('expandFiles') ? Number.MAX_VALUE : 3;
				}
			},
			data: function () {
				return {
					apiRoot: 'https://api.jsdelivr.com/v1',
					cdnRoot: 'https://cdn.jsdelivr.net',
					getFilesByVersion: getFilesByVersion,
					getCollectionIndex: getCollectionIndex,
				};
			},
			decorators: {
				select: selectDecorator,
				tooltip: tooltipDecorator,
			},
			toggleCollectionFile: function (file) {
				var project = this.get('project');
				var index;

				if (~(index = getCollectionIndex(this.get('collection'), project.name, project.selectedVersion, file))) {
					this.splice('collection', index, 1);
				} else {
					this.push('collection', {
						name: file,
						project: project.name,
						version: project.selectedVersion,
						mainfile: project.mainfile,
					});
				}
			},
			toggleCollectionProject: function () {
				var project = this.get('project');
				var collection = this.get('collection');

				if (!~getCollectionIndex(collection, project.name, project.selectedVersion)) {
					this.toggleCollectionFile(project.mainfile);
				} else {
					this.splice.apply(this, [ 'collection', 0, collection.length ].concat(collection.filter(function (file) {
						return file.project !== project.name;
					})));
				}
			},
			toggleShowMoreFiles: function () {
				var $project = $(this.find('.project'));
				var _this = this;

				this.toggle('project.showMoreFiles').then(function () {
					if(!_this.get('project.showMoreFiles') && $project.offset().top < $(document).scrollTop()) {
						$('html, body').animate({
							scrollTop: $project.offset().top
						});
					}
				});
			},
		};

	if ( typeof shared_project__component.exports === "object" ) {
		for ( shared_project____prop__ in shared_project__component.exports ) {
			if ( shared_project__component.exports.hasOwnProperty(shared_project____prop__) ) {
				shared_project____options__[shared_project____prop__] = shared_project__component.exports[shared_project____prop__];
			}
		}
	}

	shared_project____export__ = Ractive.extend( shared_project____options__ );

	})();


	var shared_project = shared_project____export__;

	'use strict';

	var CSS_PATTERN = /\.css$/i;
	var JS_PATTERN = /\.js$/i;
	var CDN_ROOT = '//cdn.jsdelivr.net';

	var build_links = function (collection) {
		var groupLinks = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		var links = { js: [], css: [], other: [] };

		collection.forEach(function (file) {
			var link = CDN_ROOT + '/' + file.project + '/' + file.version + '/' + file.name;

			if (CSS_PATTERN.test(file.name)) {
				links.css.push(link);
			} else if (JS_PATTERN.test(file.name)) {
				links.js.push(link);
			} else {
				links.other.push(link);
			}
		});

		if (!groupLinks) {
			return links;
		}

		return {
			js: buildLink(collection, JS_PATTERN, links.js.length > 1),
			css: buildLink(collection, CSS_PATTERN, links.css.length > 1),
			other: links.other
		};
	}

	function buildLink(collection, filter, merge) {
		var chunks = [];
		var filtered = collection.filter(function (file) {
			return filter.test(file.name);
		});

		// There is ony one file of this type; don't merge.
		if (!merge && filtered.length) {
			return [CDN_ROOT + '/' + filtered[0].project + '/' + filtered[0].version + '/' + filtered[0].name];
		}

		groupByProject(filtered).forEach(function (project) {
			if (project.files.length) {
				var link = project.name + '@' + project.version;

				// No need to create a list of files if there is only the main file.
				if (project.files.length !== 1 || project.files[0] !== project.mainfile) {
					link += '(' + project.files.join('+') + ')';
				}

				chunks.push(link);
			}
		});

		return chunks.length ? [CDN_ROOT + '/g/' + chunks.join(',')] : [];
	}

	function groupByProject(collection) {
		var projects = {};

		collection.forEach(function (file) {
			var key = file.project + file.version;

			if (!projects[key]) {
				projects[key] = {
					name: file.project,
					version: file.version,
					mainfile: file.mainfile,
					files: [file.name]
				};
			} else {
				projects[key].files.push(file.name);
			}
		});

		return Object.keys(projects).map(function (key) {
			return projects[key];
		});
	}

	"use strict";

	var hex_to_base64 = function (string) {
		return btoa(String.fromCharCode.apply(null, string.match(/([\da-fA-F]{2})/g).map(function (charCode) {
			return parseInt(charCode, 16);
		})));
	}

	'use strict';

	var zero_clipboard_js = function (node) {
		var tooltipPlacement = arguments.length <= 1 || arguments[1] === undefined ? 'top' : arguments[1];

		var clip = new ZeroClipboard(node);
		var $node = $(node);
		var tooltipOptions = {
			title: 'Copy to Clipboard',
			placement: tooltipPlacement,
			trigger: 'hover',
			container: 'body',
			animation: false
		};

		$node.on('mouseover', function () {
			$node.tooltip('destroy').tooltip(tooltipOptions).tooltip('show');
		});

		clip.on('aftercopy', function () {
			$node.tooltip('destroy').tooltip($.extend({}, tooltipOptions, { title: 'Copied!' })).tooltip('show');
		});

		return {
			teardown: function teardown() {}
		};
	}

	var collection_links____options__ = {
		template: {v:3,t:[{p:[1,1,0],t:7,e:"div",a:{"class":"modal fade collection-links",role:"dialog"},f:[{p:[2,2,58],t:7,e:"div",a:{"class":"modal-dialog"},f:[{p:[3,3,88],t:7,e:"div",a:{"class":"modal-content"},f:[{p:[4,4,120],t:7,e:"div",a:{"class":"modal-header"},f:[{p:[5,5,152],t:7,e:"button",a:{type:"button","class":"close","data-dismiss":"modal","aria-hidden":"true"},f:["×"]}," ",{p:[6,5,250],t:7,e:"h3",a:{"class":"modal-title"},f:["Links collection"]}]}," ",{t:4,f:[{p:[10,5,334],t:7,e:"div",a:{"class":"modal-body"},f:[{p:[11,6,365],t:7,e:"div",a:{"class":"collection-links-options"},f:[{p:[12,7,411],t:7,e:"input",a:{"class":"radio-inline",type:"checkbox",checked:[{t:2,r:"groupLinks",p:[12,60,464]}],id:"groupLinks"}}," ",{p:[13,7,504],t:7,e:"label",a:{"for":"groupLinks"},f:["Group links"]}," ",{p:[15,7,557],t:7,e:"input",a:{"class":"radio-inline",type:"checkbox",checked:[{t:2,r:"addTag",p:[15,60,610]}],id:"addTag"}}," ",{p:[16,7,642],t:7,e:"label",a:{"for":"addTag"},f:["Add the ",{p:[16,35,670],t:7,e:"b",f:["<script>"]}," tag"]}," ",{p:[18,7,713],t:7,e:"input",a:{"class":"radio-inline",type:"checkbox",checked:[{t:2,r:"addProtocol",p:[18,60,766]}],id:"addProtocol"}}," ",{p:[19,7,808],t:7,e:"label",a:{"for":"addProtocol"},f:["Add the ",{p:[19,40,841],t:7,e:"b",f:["https:"]}]}," ",{p:[21,7,872],t:7,e:"input",a:{"class":"radio-inline",type:"checkbox",checked:[{t:2,r:"enableSri",p:[21,60,925]}],id:"enableSRI"}}," ",{p:[22,7,963],t:7,e:"label",a:{"for":"enableSRI"},f:["Enable SRI"]}]}," ",{t:4,f:[{p:[26,7,1072],t:7,e:"div",a:{"class":"computing-hashes"},f:["Please wait while we compute the SRI hashes... ",{p:[29,8,1168],t:7,e:"div",a:{"class":"progress"},f:[{p:[30,9,1200],t:7,e:"div",a:{"class":"progress-bar",role:"progressbar",style:["width: ",{t:2,r:"sriProgress",p:[30,68,1259]},"%"]}}]}]}],n:50,x:{r:["enableSri","sriProgress"],s:"_0&&_1<100"},p:[25,6,1026]},{t:4,n:51,f:[{t:4,f:[{p:[35,8,1366],t:7,e:"div",a:{"class":"alert alert-warning sri-warning",role:"alert"},f:["Some files in your collection contain UTF-8 characters. Due to a ",{p:[37,18,1508],t:7,e:"a",a:{href:"https://code.google.com/p/chromium/issues/detail?id=527286",target:"_blank"},f:["bug in Google Chrome"]},", we disabled SRI for those files."]}],n:50,r:"showSriWarning",p:[34,7,1335]}," ",{t:4,f:[{p:[42,8,1725],t:7,e:"h4",a:{"class":"strikethrough"},f:[{p:[42,34,1751],t:7,e:"span",f:["JS"]}]}," ",{t:4,f:[{p:[45,9,1810],t:7,e:"div",a:{"class":"grouped-link"},f:[{p:[46,10,1847],t:7,e:"div",o:"select",f:[{t:2,r:"js.0",p:[46,34,1871]}]}," ",{t:4,f:[{p:[49,11,1927],t:7,e:"button",a:{"class":"btn btn-default btn-copy","data-clipboard-text":[{t:2,r:"js.0",p:[49,99,2015]}]},o:"zeroClipboard",f:[{p:[50,12,2039],t:7,e:"i",a:{"class":"fa fa-copy"}}," Copy"]}],n:50,r:"hasFlash",p:[48,10,1899]}]}],n:50,r:"groupLinks",p:[44,8,1782]},{t:4,n:51,f:[{t:4,f:[{p:[56,10,2184],t:7,e:"div",a:{"class":"collection-file"},f:[{p:[57,11,2225],t:7,e:"div",a:{"class":"row"},f:[{p:[58,12,2255],t:7,e:"div",a:{"class":["col-xs-",{t:2,x:{r:["hasFlash"],s:"_0?22:24"},p:[58,31,2274]}]},f:[{p:[59,13,2312],t:7,e:"div",o:"select",f:[{t:2,r:".",p:[59,37,2336]}]}]}," ",{t:4,f:[{p:[63,13,2414],t:7,e:"div",a:{"class":"col-xs-2 collection-file-copy-wrapper"},f:[{p:[64,14,2480],t:7,e:"i",a:{"class":"fa fa-copy clickable","data-clipboard-text":[{t:2,r:".",p:[64,93,2559]}]},o:"zeroClipboard"}]}],n:50,r:"hasFlash",p:[62,12,2384]}]}]}],n:52,r:"js",p:[55,9,2161]}],r:"groupLinks"}],n:50,r:"js",p:[41,7,1706]}," ",{t:4,f:[{p:[74,8,2754],t:7,e:"h4",a:{"class":"strikethrough"},f:[{p:[74,34,2780],t:7,e:"span",f:["CSS"]}]}," ",{t:4,f:[{p:[77,9,2840],t:7,e:"div",a:{"class":"grouped-link"},f:[{p:[78,10,2877],t:7,e:"div",o:"select",f:[{t:2,r:"css.0",p:[78,34,2901]}]}," ",{t:4,f:[{p:[81,11,2958],t:7,e:"button",a:{"class":"btn btn-default btn-copy","data-clipboard-text":[{t:2,r:"css.0",p:[81,99,3046]}]},o:"zeroClipboard",f:[{p:[82,12,3071],t:7,e:"i",a:{"class":"fa fa-copy"}}," Copy"]}],n:50,r:"hasFlash",p:[80,10,2930]}]}],n:50,r:"groupLinks",p:[76,8,2812]},{t:4,n:51,f:[{t:4,f:[{p:[88,10,3217],t:7,e:"div",a:{"class":"collection-file"},f:[{p:[89,11,3258],t:7,e:"div",a:{"class":"row"},f:[{p:[90,12,3288],t:7,e:"div",a:{"class":["col-xs-",{t:2,x:{r:["hasFlash"],s:"_0?22:24"},p:[90,31,3307]}]},f:[{p:[91,13,3345],t:7,e:"div",o:"select",f:[{t:2,r:".",p:[91,37,3369]}]}]}," ",{t:4,f:[{p:[95,13,3447],t:7,e:"div",a:{"class":"col-xs-2 collection-file-copy-wrapper"},f:[{p:[96,14,3513],t:7,e:"i",a:{"class":"fa fa-copy clickable","data-clipboard-text":[{t:2,r:".",p:[96,93,3592]}]},o:"zeroClipboard"}]}],n:50,r:"hasFlash",p:[94,12,3417]}]}]}],n:52,r:"css",p:[87,9,3193]}],r:"groupLinks"}],n:50,r:"css",p:[73,7,2734]}," ",{t:4,f:[{p:[106,8,3791],t:7,e:"h4",a:{"class":"strikethrough"},f:[{p:[106,34,3817],t:7,e:"span",f:["Other"]}]}," ",{t:4,f:[{p:[109,9,3876],t:7,e:"div",a:{"class":"collection-file"},f:[{p:[110,10,3916],t:7,e:"div",a:{"class":"row"},f:[{p:[111,11,3945],t:7,e:"div",a:{"class":["col-xs-",{t:2,x:{r:["hasFlash"],s:"_0?22:24"},p:[111,30,3964]}]},f:[{p:[112,12,4001],t:7,e:"div",o:"select",f:[{t:2,r:".",p:[112,36,4025]}]}]}," ",{t:4,f:[{p:[116,12,4100],t:7,e:"div",a:{"class":"col-xs-2 collection-file-copy-wrapper"},f:[{p:[117,13,4165],t:7,e:"i",a:{"class":"fa fa-copy clickable","data-clipboard-text":[{t:2,r:".",p:[117,92,4244]}]},o:"zeroClipboard"}]}],n:50,r:"hasFlash",p:[115,11,4071]}]}]}],n:52,r:"other",p:[108,8,3851]}],n:50,r:"other",p:[105,7,3769]}],x:{r:["enableSri","sriProgress"],s:"_0&&_1<100"}}]}],n:53,r:"links",p:[9,4,313]}]}]}]}]},
	},
	collection_links__component={},
	collection_links____prop__,
	collection_links____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/build-links': build_links,
			'public/js/utils/hex-to-base64': hex_to_base64,
			'public/js/decorators/select.js': __import4__,
			'public/js/decorators/zero-clipboard.js': zero_clipboard_js
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		var linkBuilder = require('public/js/utils/build-links');
		var hexToBase64 = require('public/js/utils/hex-to-base64');
		var selectDecorator = require('public/js/decorators/select.js');
		var zeroClipboardDecorator = require('public/js/decorators/zero-clipboard.js');

		collection_links__component.exports = {
			el: 'body',
			append: true,
			computed: {
				addTag: {
					get: function () {
						return this.get('enableSri') || this.get('_addTag');
					},
					set: function (value) {
						this.set('_addTag', value);
						this.set('_addTagSri', value);
					},
				},
				addProtocol: {
					get: function () {
						return this.get('enableSri') || this.get('_addProtocol');
					},
					set: function (value) {
						this.set('_addProtocol', value);
						this.set('_addProtocolSri', value);
					},
				},
				enableSri: {
					get: function () {
						return this.get('_enableSri') && this.get('_addTag') && this.get('_addProtocol') && !this.get('_groupLinks');
					},
					set: function (value) {
						this.set('_enableSri', value);

						if (value) {
							this.set('_addTag', true);
							this.set('_addProtocol', true);
							this.set('_groupLinks', false);
						} else {
							this.set('_addTag', this.get('_addTagSri'));
							this.set('_addProtocol', this.get('_addProtocolSri'));
							this.set('_groupLinks', this.get('_groupLinksSri'));
						}
					},
				},
				groupLinks: {
					get: function () {
						return !this.get('enableSri') && this.get('_groupLinks');
					},
					set: function (value) {
						this.set('_groupLinks', value);
						this.set('_groupLinksSri', value);
					},
				},
				hashes: function () {
					if (!this.get('groupLinks')) {
						var links = linkBuilder(this.get('collection'), this.get('groupLinks'));
						var allLinks = links.js.concat.apply(links.js, links.css);
						var _this = this;

						allLinks.forEach(function (link) {
							if (app.sriHashes[link] === undefined) {
								app.sriHashes[link] = true;

								$.get(link, function (file) {
									app.sriHashes[link] = !/[^\u0000-\u007F]/.test(file) ? 'sha256-' + hexToBase64(sha256(file)) : null;
									_this.set('_hashes', app.sriHashes);
								}, 'html');
							}
						});

						app.sriHashes.length = Object.keys(app.sriHashes).filter(function (key) {
							return typeof key === 'string' && ~allLinks.indexOf(key) && app.sriHashes[key] !== true;
						}).length;
					}

					return this.get('_hashes') && app.sriHashes;
				},
				links: function () {
					var links = linkBuilder(this.get('collection'), this.get('groupLinks'));
					var addTag = this.get('addTag');
					var enableSri = this.get('enableSri');
					var addProtocol = this.get('addProtocol');
					var hashes = enableSri && this.get('hashes');

					links.js = links.js.map(function (link, index, collection) {
						link = addProtocol ? 'https:' + link : link;
						link = addTag
							? '<script ' + (enableSri && hashes[collection[index]] ? 'crossorigin="anonymous" integrity="' + hashes[collection[index]] + '" ' : '') +  'src="' + link + '"><\/script>'
							: link;

						return link;
					});

					links.css = links.css.map(function (link, index, collection) {
						link = addProtocol ? 'https:' + link : link;
						link = addTag
							? '<link rel="stylesheet" ' + (enableSri && hashes[collection[index]] ? 'crossorigin="anonymous" integrity="' + hashes[collection[index]] + '" ' : '') + 'href="' + link + '">'
							: link;

						return link;
					});

					links.other = links.other.map(function (link) {
						return addProtocol ? 'https:' + link : link;
					});

					return links;
				},
				sriProgress: function () {
					return this.get('hashes').length / (this.get('links').js.length + this.get('links').css.length) * 100;
				},
				showSriWarning: function () {
					var hashes = this.get('hashes');
					var links = linkBuilder(this.get('collection'), this.get('groupLinks'));
					var allLinks = links.js.concat.apply(links.js, links.css);

					return !!Object.keys(hashes).filter(function (key) {
						return typeof key === 'string' && ~allLinks.indexOf(key) && hashes[key] === null;
					}).length;
				},
			},
			data: function () {
				return {
					addTag: false,
					enableSri: false,
					groupLinks: true,
					addProtocol: true,
					linkBuilder: linkBuilder,
					_hashes: {},
				};
			},
			decorators: {
				select: selectDecorator,
				zeroClipboard: zeroClipboardDecorator
			},
			oninit: function () {
				if (!Ractive.isServer) {
					this.set('hasFlash', !ZeroClipboard.isFlashUnusable());
				}
			},
			onrender: function () {
				var _this = this;

				$(this.find('.modal'))
					.modal()
					.on('hidden.bs.modal', function() {
						_this.teardown();
					});
			},
			onunrender: function () {
				$(this.find('.modal')).modal('hide');
			},
		};

	if ( typeof collection_links__component.exports === "object" ) {
		for ( collection_links____prop__ in collection_links__component.exports ) {
			if ( collection_links__component.exports.hasOwnProperty(collection_links____prop__) ) {
				collection_links____options__[collection_links____prop__] = collection_links__component.exports[collection_links____prop__];
			}
		}
	}

	collection_links____export__ = Ractive.extend( collection_links____options__ );

	})();


	var collection_links = collection_links____export__;

	var shared_collection____options__ = {
		template: {v:3,t:[{t:4,f:[{t:4,f:[{p:[5,3,123],t:7,e:"div",a:{"class":"collection"},f:[{p:[6,4,152],t:7,e:"div",a:{"class":"container"},f:[{p:[7,5,181],t:7,e:"div",a:{"class":"row"},f:[{p:[8,6,205],t:7,e:"div",a:{"class":"col-lg-16 col-lg-offset-4 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:[{p:[9,7,330],t:7,e:"div",a:{"class":"row"},f:[{p:[10,8,356],t:7,e:"div",a:{"class":"col-sm-20 col-xs-18"},f:[{p:[11,9,399],t:7,e:"div",a:{"class":"input-group"},f:[{p:[12,10,435],t:7,e:"input",a:{type:"text","class":"collection-link",twoway:"false",value:[{t:2,r:"mainLink",p:[12,75,500]}],disabled:[{t:2,r:"disableLink",p:[12,118,543]}],readonly:0},o:"select"}," ",{t:4,f:[{p:[15,11,610],t:7,e:"span",a:{"class":"input-group-btn"},f:[{p:[16,12,653],t:7,e:"button",a:{"class":"btn btn-default btn-copy","data-clipboard-text":[{t:2,r:"mainLink",p:[16,100,741]}],disabled:[{t:2,r:"disableLink",p:[16,124,765]}]},o:"zeroClipboard",f:[{p:[17,13,796],t:7,e:"i",a:{"class":"fa fa-copy"}},"Copy"]}]}],n:50,r:"hasFlash",p:[14,10,582]}]}]}," ",{p:[24,8,936],t:7,e:"div",a:{"class":"col-sm-4 col-xs-6 collection-btn-wrapper"},f:[{p:[25,9,1000],t:7,e:"button",a:{"class":"btn btn-primary collection-btn"},v:{click:{m:"showLinks",a:{r:[],s:"[]"}}},f:[{p:[26,10,1081],t:7,e:"span",a:{"class":"collection-count"},f:[{t:2,r:"collection.length",p:[26,41,1112]}]}," In Collection"]}]}]}," ",{t:4,f:[{p:[32,8,1235],t:7,e:"div",t0:"slide",a:{"class":"collection-files"},f:[{t:4,f:[{p:[34,10,1326],t:7,e:"div",a:{"class":"collection-file"},f:[{t:2,r:"./name",p:[35,11,1367]}," (",{t:2,r:"./version",p:[35,26,1382]},") ",{p:[35,44,1400],t:7,e:"i",a:{"class":"fa fa-times-circle clickable"},v:{click:{m:"splice",a:{r:["@index"],s:"[\"collection\",_0,1]"}}}}]}],n:52,r:"collection",p:[33,9,1295]}]}],n:50,r:"expand",p:[31,7,1212]}," ",{p:[41,7,1581],t:7,e:"button",a:{"class":"btn btn-default btn-icon collection-toggle-btn"},v:{click:{m:"toggle",a:{r:[],s:"[\"expand\"]"}}},f:[{p:[42,8,1681],t:7,e:"i",a:{"class":["fa ",{t:2,x:{r:["expand"],s:"_0?\"fa-angle-up\":\"fa-angle-down\""},p:[42,21,1694]}]}}]}]}]}]}]}],n:53,r:"collection",p:[4,2,99]}],n:50,r:"collection",p:[3,1,78]}]},
		components:{	CollectionLinks: collection_links}
	},
	shared_collection__component={},
	shared_collection____prop__,
	shared_collection____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/has': utils_has,
			'public/js/utils/build-links': build_links,
			'public/js/decorators/select': __import4__,
			'public/js/decorators/zero-clipboard': zero_clipboard_js
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		var has = require('public/js/utils/has');
		var buildLinks = require('public/js/utils/build-links');
		var selectDecorator = require('public/js/decorators/select');
		var zeroClipboardDecorator = require('public/js/decorators/zero-clipboard');

		shared_collection__component.exports = {
			data: function () {
				return {
					offsetTop: 0,
					stickyOnBottom: true,
				};
			},
			computed: {
				disableLink: function () {
					var links = this.get('links');

					return (links.css.length && links.js.length) || links.other.length;
				},
				mainLink: function () {
					var links = this.get('links');

					return !this.get('disableLink') ? 'https:' + (links.js[0] || links.css[0]) : 'Multiple file types selected. Use the IN COLLECTION button instead.';
				},
				links: function () {
					return buildLinks(this.get('collection'));
				},
			},
			decorators: {
				select: selectDecorator,
				zeroClipboard: zeroClipboardDecorator,
			},
			oninit: function () {
				if (!Ractive.isServer) {
					this.set('hasFlash', !ZeroClipboard.isFlashUnusable());

					if (has.localStorage()) {
						this.observe('collection', function (newValue) {
							localStorage.setItem('collection', JSON.stringify(newValue));
						}, { init: false });
					}

					this.observe('collection.length', function (newValue, oldValue) {
						var $navbar = $('.header > .navbar');

						if (newValue && !oldValue && $navbar.hasClass('affix-top')) {
							scrollBy(0, 94);

							$('.tooltip').each(function () {
								$(this).css('top', parseFloat($(this).css('top')) + 94);
							});
						} else if (oldValue && !newValue && $navbar.hasClass('affix-top')) {
							scrollBy(0, -94);

							$('.tooltip').each(function () {
								$(this).css('top', parseFloat($(this).css('top')) - 94);
							});
						}
					});
				}
			},
			onrender: function () {
				this.observe('collection.length', function (length) {
					if (length) {
						var $collection = $(this.find('.collection'));

						if (this.get('offsetTop') === 0) {
							$collection.addClass('affix');
						} else {
							var _this = this;

							$collection.affix({
								offset: {
									top: function () {
										return !pageYOffset || !_this.get('stickyOnBottom') || document.body.scrollHeight - pageYOffset - innerHeight > 0 ? _this.get('offsetTop') : 0;
									},
									bottom: 0,
								}
							});
						}
					}
				}, { defer: true });
			},
			showLinks: function () {
				new this.components.CollectionLinks({
					data: {
						collection: this.get('collection'),
					}
				});
			},
		};

	if ( typeof shared_collection__component.exports === "object" ) {
		for ( shared_collection____prop__ in shared_collection__component.exports ) {
			if ( shared_collection__component.exports.hasOwnProperty(shared_collection____prop__) ) {
				shared_collection____options__[shared_collection____prop__] = shared_collection__component.exports[shared_collection____prop__];
			}
		}
	}

	shared_collection____export__ = Ractive.extend( shared_collection____options__ );

	})();


	var shared_collection = shared_collection____export__;

	'use strict';

	var ATTR_REGEXP = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
	var QUERY_REGEXP = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;

	var parseQuery = function (queryString) {
		var query = queryString.match(QUERY_REGEXP)[0].trim();
		var substr = queryString.substr(query.length);
		var filters = [];
		var match = undefined;

		while ((match = ATTR_REGEXP.exec(substr)) !== null) {
			var temp = match[0].split(':');
			filters.push(temp[0].trim() + ':' + temp[1].trim());
		}

		return {
			query: query,
			facetFilters: filters.join(',')
		};
	}

	'use strict';

	var utils_search__jsDelivrIndex = algolia.initIndex('jsDelivr');

	var utils_search = function (queryString) {
		var page = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
		var hitsPerPage = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

		return Promise.resolve().then(function () {
			var parsed = parseQuery(queryString);
			var options = { page: page, hitsPerPage: hitsPerPage };
			var promise = undefined;

			if (parsed.facetFilters) {
				options.facetFilters = parsed.facetFilters;
			}

			if (parsed.query || options.facetFilters) {
				promise = utils_search__jsDelivrIndex.search(parsed.query, options);
			} else {
				promise = utils_search__jsDelivrIndex.browse(options.page, hitsPerPage);
			}

			return promise.then(function (response) {
				var load = [];

				response.hits.forEach(function (project) {
					project.selectedVersion = project.lastversion;

					if (!project.assets.length) {
						load.push(project);
					}
				});

				if (!load.length) {
					return {
						response: $.extend(true, {}, response),
						queryString: queryString
					};
				}

				algolia.startQueriesBatch();

				load.forEach(function (project) {
					algolia.addQueryInBatch('jsDelivr_assets', '', {
						hitsPerPage: 100,
						facetFilters: 'name: ' + project.name
					});
				});

				return algolia.sendQueriesBatch().then(function (content) {
					load.forEach(function (project, index) {
						project.assets = content.results[index].hits;
					});

					return {
						response: $.extend(true, {}, response),
						queryString: queryString
					};
				});
			});
		});
	}

	'use strict';

	var __import5__ = function () {
		return __import1__().then(function (nbProjects) {
			var hasLocalStorage = utils_has.localStorage();
			var now = Date.now();

			if (hasLocalStorage && localStorage.getItem('randomProjectsExpires') >= now) {
				return JSON.parse(localStorage.getItem('randomProjects'));
			}

			return utils_search('', Math.floor(Math.random() * nbProjects / 10)).then(function (result) {
				if (hasLocalStorage) {
					localStorage.setItem('randomProjects', JSON.stringify(result.response));
					localStorage.setItem('randomProjectsExpires', now + 604800000); // Cache for one week.
				}

				return result.response;
			});
		});
	}

	var cIndex____options__ = {
		template: {v:3,t:[{p:[6,1,277],t:7,e:"div",a:{"class":"index"},f:[{p:[7,2,299],t:7,e:"header",a:{"class":"index-header"},f:[{p:[8,3,332],t:7,e:"nav",a:{"class":"navbar navbar-inverse index-top-navbar"},f:[{p:[9,4,389],t:7,e:"div",a:{"class":"container"},f:[{p:[10,5,418],t:7,e:"div",a:{"class":"row"},f:[{p:[11,6,442],t:7,e:"div",a:{"class":"col-xs-4 col-xs-offset-1"},f:[{p:[12,7,488],t:7,e:"a",a:{"class":"navbar-brand",href:"/"},f:[{p:[12,40,521],t:7,e:"img",a:{src:"/img/logo-50.png",height:"50"}}]}]}," ",{p:[15,6,587],t:7,e:"div",a:{"class":"col-xs-14"},f:[{p:[16,7,618],t:7,e:"NavbarNav"}]}," ",{p:[19,6,663],t:7,e:"div",a:{"class":"col-xs-4"},f:[{p:[20,7,693],t:7,e:"a",a:{href:"https://github.com/jsdelivr/jsdelivr/blob/master/CONTRIBUTING.md","class":"btn btn-primary"},f:[{p:[20,106,792],t:7,e:"i",a:{"class":"fa fa-cloud-upload"}},"Add Project"]}]}]}]}]}," ",{p:[26,3,893],t:7,e:"div",a:{"class":"container"},f:[{p:[27,4,921],t:7,e:"div",a:{"class":"row"},f:[{p:[28,5,944],t:7,e:"div",a:{"class":"col-xs-20 col-xs-offset-2"},f:[{p:[29,6,990],t:7,e:"h1",f:[{p:[29,10,994],t:7,e:"strong",f:["A free super-fast CDN"]},{p:[29,48,1032],t:7,e:"br"}," for developers and webmasters"]}]}]}," ",{p:[33,4,1101],t:7,e:"div",a:{"class":"row"},f:[{p:[34,5,1124],t:7,e:"div",a:{"class":"col-xs-20 col-xs-offset-2"},f:[{p:[35,6,1170],t:7,e:"div",a:{"class":"sub-level"},f:["Search for JavaScript libraries, jQuery plugins, fonts, CSS frameworks,",{p:[36,78,1272],t:7,e:"br"}," and anything else you might need. You can submit something if it is missing."]}," ",{p:[40,6,1382],t:7,e:"input",a:{type:"text","class":"index-search-input",value:[{t:2,r:"query",p:[40,59,1435]}],placeholder:["Search more than ",{t:2,r:"nbProjects",p:[40,100,1476]}," open source projects..."]}}]}]}]}]}," ",{p:[46,2,1566],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[46,15,1579]}],query:[{t:2,r:"query",p:[46,31,1595]}],stickyOnBottom:"false",sponsorsOnTop:"true"}}," ",{p:[47,2,1662],t:7,e:"Collection",a:{collection:[{t:2,r:"collection",p:[47,26,1686]}],offsetTop:"868",stickyOnBottom:"false"}}," ",{p:[49,2,1759],t:7,e:"div",a:{"class":"container index-projects"},f:[{t:4,f:[{p:[51,4,1824],t:7,e:"div",a:{"class":"row"},t1:{n:[{t:4,f:["fade"],n:50,r:"fadeIn",p:[51,28,1848]}],d:[]},f:[{p:[52,5,1888],t:7,e:"div",a:{"class":"col-lg-16 col-lg-offset-4 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:[{p:[53,6,2012],t:7,e:"Project",a:{project:[{t:2,r:".",p:[53,24,2030]}],collection:[{t:2,r:"collection",p:[53,46,2052]}],expandFiles:[{t:2,r:"expandFiles",p:[53,75,2081]}]}}]}]}],n:52,r:"projects",p:[50,3,1801]},{t:4,n:51,f:[{p:[57,4,2148],t:7,e:"div",a:{"class":"col-lg-16 col-lg-offset-4 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:["No projects found."]}],r:"projects"}," ",{t:4,f:[{p:[63,4,2361],t:7,e:"div",a:{"class":"row"},f:[{p:[64,5,2384],t:7,e:"div",a:{"class":"col-lg-16 col-lg-offset-4 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:[{p:[65,6,2508],t:7,e:"div",a:{"class":"index-show-more-projects"},f:[{p:[66,7,2554],t:7,e:"span",a:{"class":"clickable"},v:{click:{m:"add",a:{r:[],s:"[\"hitsPerPage\",10]"}}},f:[{p:[67,8,2621],t:7,e:"i",a:{"class":"fa fa-circle"}}," ",{p:[67,37,2650],t:7,e:"i",a:{"class":"fa fa-circle"}}," ",{p:[67,66,2679],t:7,e:"i",a:{"class":"fa fa-circle"}},"Show more"]}]}]}]}],n:50,x:{r:["nbHits","hitsPerPage"],s:"_0>_1"},p:[62,3,2328]}]}]}]},
		components:{	Project: shared_project,
		NavbarNav: __import0__,
		Header: header,
		Collection: shared_collection}
	},
	cIndex__component={},
	cIndex____prop__,
	cIndex____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/search': utils_search,
			'public/js/utils/search-random': __import5__,
			'public/js/utils/count-projects': __import1__
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		cIndex__component.exports = {
			computed: {
				expandFiles: function () {
					return this.get('projects.length') === 1;
				},
				limit: {
					get: function () {
						return this.get('hitsPerPage') > 10 ? this.get('hitsPerPage') : 0;
					},
					set: function (value) {
						this.set('hitsPerPage', value);
					},
				},
			},
			data: function () {
				return {
					query: '',
					projects: [],
					hitsPerPage: 10,
					cdnRoot: '',
					useScrollBy: false,
				};
			},
			oninit: function () {
				if (!Ractive.isServer) {
					var search = require('public/js/utils/search');
					var searchRandom = require('public/js/utils/search-random');
					var countProjects = require('public/js/utils/count-projects');
					var _this = this;

					// Show number of hosted projects.
					countProjects().then(function (nbProjects) {
						nbProjects && _this.set('nbProjects', nbProjects);
					});

					// Make sure query is always a string.
					this.observe('query', function (value) {
						if (typeof value !== 'string') {
							this.set('query', String(value));
						}
					});

					// Update results on input.
					this.observe('hitsPerPage query __ready', function (newValue, oldValue, keypath) {
						// Don't send requests before have all the data.
						if (this.get('__ready')) {
							// Show 10 random projects.
							if (keypath === '__ready' && !this.get('query') && this.get('hitsPerPage') === 10) {
								searchRandom().then(function (response) {
									_this.merge('projects', response.hits);
									_this.set({ nbPages: response.nbPages });
									_this.set('fadeIn', true);
								});
							} else {
								// Reset hitsPerPage on query change.
								if (keypath === 'query' && this.get('hitsPerPage') !== 10) {
									this.set('hitsPerPage', 10);
								} else {
									search(this.get('query'), 0, this.get('hitsPerPage')).then(function (result) {
										// The query might have changed since we sent the request.
										if (result.queryString === _this.get('query')) {
											_this.merge('projects', result.response.hits, { compare: 'name' });
											_this.set('fadeIn', true);
											_this.set({
												nbPages: result.response.nbPages,
												nbHits: result.response.nbHits,
											});

											// If we're right at the top (usually right after page load), scroll down to the results.
											if (!pageYOffset && _this.findComponent('Header').find('.search-input') === document.activeElement) {
												if (_this.get('app.config.animateScrolling')) {
													$('html, body').animate({
														scrollTop: 740,
													});
												} else {
													scrollBy(0, 740);
													_this.set('app.config.animateScrolling', true);
												}
											}
										}
									});
								}
							}
						}
					});
				}
			},
			onrender: function () {
				var _this = this;
				var $input = $(this.find('.index-search-input'));

				$(this.find('.header .navbar')).affix({
					offset: {
						top: function () {
							return !pageYOffset || !_this.get('stickyOnBottom') || document.body.scrollHeight - pageYOffset - innerHeight > 0 ? 868 : 0;
						},
						bottom: 0,
					}
				});

				if (!this.get('query')) {
					$input.focus();
				}

				$input.on('input', function () {
					var $headerInput = $('.header .search-input').focus();
					var value = $headerInput.val();

					// Make sure the cursor is at the end of the input.
					$headerInput.val('');
					$headerInput.val(value);

					setTimeout(function () {
						scrollTo(0, 740);
					});
				});
			},
			oncomplete: function () {
				// Redirect from the old URL format.
				if (location.hash && !this.get('query')) {
					this.get('app.router').dispatch('/projects/' + location.hash.substr(2), { noHistory: true });
				}
			}
		};

	if ( typeof cIndex__component.exports === "object" ) {
		for ( cIndex____prop__ in cIndex__component.exports ) {
			if ( cIndex__component.exports.hasOwnProperty(cIndex____prop__) ) {
				cIndex____options__[cIndex____prop__] = cIndex__component.exports[cIndex____prop__];
			}
		}
	}

	cIndex____export__ = Ractive.extend( cIndex____options__ );

	})();


	var cIndex = cIndex____export__;

	var cProjects____options__ = {
		template: {v:3,t:[{p:[5,1,204],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[5,14,217]}],query:[{t:2,r:"query",p:[5,30,233]}]}}," ",{p:[6,1,255],t:7,e:"Collection",a:{collection:[{t:2,r:"collection",p:[6,25,279]}]}}," ",{p:[8,1,312],t:7,e:"div",a:{"class":"projects",style:[{t:4,f:["padding-top: 114px;"],n:50,r:"collection.length",p:[8,30,341]}]},f:[{p:[9,2,397],t:7,e:"div",a:{"class":"container"},f:[{p:[10,3,424],t:7,e:"div",a:{"class":"row"},t1:{n:[{t:4,f:["fade"],n:50,r:"fadeIn",p:[10,27,448]}],d:[]},f:[{p:[11,4,487],t:7,e:"div",a:{"class":"col-lg-16 col-lg-offset-4 col-md-22 col-md-offset-1 col-sm-24 col-sm-offset-0 col-xs-20 col-xs-offset-2"},f:[{t:4,f:[{p:[13,6,632],t:7,e:"Project",a:{project:[{t:2,r:"project",p:[13,24,650]}],collection:[{t:2,r:"collection",p:[13,49,675]}],expandFiles:"true"}}],n:50,r:"project",p:[12,5,610]},{t:4,n:51,f:[{t:4,f:["Project not found."],n:50,x:{r:["project","LOADING"],s:"_0!==_1"},p:[15,6,741]}],r:"project"}]}]}]}]}]},
		components:{	Header: header,
		Collection: shared_collection,
		Project: shared_project}
	},
	cProjects__component={},
	cProjects____prop__,
	cProjects____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/search.js': utils_search
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		cProjects__component.exports = {
			computed: {
				title: function () {
					return this.get('name') + ' free CDN links by jsDelivr - A super-fast CDN for developers and webmasters';
				},
			},
			oninit: function () {
				if (!Ractive.isServer) {
					var search = require('public/js/utils/search.js');
					var _this = this;

					this.set('LOADING', {});
					this.set('project', this.get('LOADING'));

					search('name: ' + this.get('name')).then(function (result) {
						_this.set('project', result.response.hits[0]);
					});
				}
			}
		};

	if ( typeof cProjects__component.exports === "object" ) {
		for ( cProjects____prop__ in cProjects__component.exports ) {
			if ( cProjects__component.exports.hasOwnProperty(cProjects____prop__) ) {
				cProjects____options__[cProjects____prop__] = cProjects__component.exports[cProjects____prop__];
			}
		}
	}

	cProjects____export__ = Ractive.extend( cProjects____options__ );

	})();


	var cProjects = cProjects____export__;

	var sponsors_sidebar____options__ = {
		template: {v:3,t:[{p:[3,1,67],t:7,e:"Sidebar",a:{links:"[\n\t{ href: '/sponsors/our-sponsors', name: 'Our sponsors' },\n\t{ href: '/sponsors/become-a-sponsor', name: 'Become a sponsor' }\n]"}}]},
		components:{	Sidebar: sidebar}
	},
	sponsors_sidebar__component={},
	sponsors_sidebar____prop__,
	sponsors_sidebar____export__;


	if ( typeof sponsors_sidebar__component.exports === "object" ) {
		for ( sponsors_sidebar____prop__ in sponsors_sidebar__component.exports ) {
			if ( sponsors_sidebar__component.exports.hasOwnProperty(sponsors_sidebar____prop__) ) {
				sponsors_sidebar____options__[sponsors_sidebar____prop__] = sponsors_sidebar__component.exports[sponsors_sidebar____prop__];
			}
		}
	}

	sponsors_sidebar____export__ = Ractive.extend( sponsors_sidebar____options__ );

	var sponsors_sidebar = sponsors_sidebar____export__;

	var cBecomeASponsor____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"SponsorsSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"become-a-sponsor sponsors"},f:[{p:[8,2,266],t:7,e:"div",a:{"class":"container"},f:[{p:[9,3,293],t:7,e:"div",a:{"class":"row"},f:[{p:[10,4,315],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-5 col-xs-16 col-xs-offset-7"},f:[{p:[11,5,412],t:7,e:"h1",f:["Become a sponsor and make jsDelivr better"]}," ",{p:[12,5,468],t:7,e:"p",f:["You can either sponsor jsDelivr with your services or with monthly donations. For example, to become a Bronze sponsor you need to either sponsor a service worth $150-499 per month or simply donate the same amount of money towards the further development of the project. If you are a company then you can also donate development hours of your coders towards improving jsDelivr. Just send us an email if you have questions."]}]}]}]}," ",{p:[16,2,929],t:7,e:"div",a:{"class":"container become-a-sponsor-content-wrapper"},f:[{p:[17,3,989],t:7,e:"div",a:{"class":"row"},f:[{p:[18,4,1011],t:7,e:"div",a:{"class":"col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-2 col-xs-6"},f:[{p:[19,5,1089],t:7,e:"div",a:{"class":"pricing-table pricing-table-platinum"},f:[{p:[20,6,1146],t:7,e:"div",a:{"class":"pricing-table-title"},f:["Platinum"]}," ",{p:[24,6,1217],t:7,e:"div",a:{"class":"pricing-table-body"},f:[{p:[25,7,1257],t:7,e:"div",a:{"class":"pricing-table-price"},f:["$1 500",{p:[26,14,1305],t:7,e:"sup",f:["+"]}," ",{p:[27,8,1326],t:7,e:"div",f:["/month"]}]}," ",{p:[30,7,1367],t:7,e:"ul",f:[{p:[31,8,1380],t:7,e:"li",f:["Logo + link in header"]}," ",{p:[32,8,1419],t:7,e:"li",f:["Blog post announcing the sponsorship"]}," ",{p:[33,8,1473],t:7,e:"li",f:["Tweet"]}," ",{p:[34,8,1496],t:7,e:"li",f:["Big logo on top, in \"Sponsors\" page along with a text description"]}," ",{p:[35,8,1579],t:7,e:"li",f:["Mentions future in blog posts on third-party websites"]}," ",{p:[36,8,1650],t:7,e:"li",f:["Other possible partnership opportunities"]}]}]}," ",{p:[40,6,1734],t:7,e:"div",a:{"class":"pricing-table-footer"},f:[{p:[41,7,1776],t:7,e:"a",a:{href:"mailto:contact@jsdelivr.com?subject=Platinum%20sponsor","class":"btn btn-become-a-sponsor"},f:["Become a sponsor"]}," ",{p:[42,7,1902],t:7,e:"a",a:{"class":"pricing-table-sponsor-sample",href:"/sponsors/our-sponsors#platinum"},f:["Sample"]}]}]}]}," ",{p:[47,4,2034],t:7,e:"div",a:{"class":"col-md-4 col-sm-5 col-xs-6"},f:[{p:[48,5,2080],t:7,e:"div",a:{"class":"pricing-table pricing-table-gold"},f:[{p:[49,6,2133],t:7,e:"div",a:{"class":"pricing-table-title"},f:["Gold"]}," ",{p:[53,6,2200],t:7,e:"div",a:{"class":"pricing-table-body"},f:[{p:[54,7,2240],t:7,e:"div",a:{"class":"pricing-table-price"},f:["$500 ",{p:[56,8,2295],t:7,e:"div",f:["/month"]}]}," ",{p:[59,7,2336],t:7,e:"ul",f:[{p:[60,8,2349],t:7,e:"li",f:["Logo + link in footer"]}," ",{p:[61,8,2388],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Blog post announcing the sponsorship"]}," ",{p:[62,8,2473],t:7,e:"li",f:["Tweet"]}," ",{p:[63,8,2496],t:7,e:"li",f:["Logo + link below Platinum sponsors in \"Sponsors\" page. Small description"]}," ",{p:[64,8,2587],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Mentions future in blog posts on third-party websites"]}]}]}," ",{p:[68,6,2715],t:7,e:"div",a:{"class":"pricing-table-footer"},f:[{p:[69,7,2757],t:7,e:"a",a:{href:"mailto:contact@jsdelivr.com?subject=Gold%20sponsor","class":"btn btn-become-a-sponsor"},f:["Become a sponsor"]}," ",{p:[70,7,2879],t:7,e:"a",a:{"class":"pricing-table-sponsor-sample",href:"/sponsors/our-sponsors#gold"},f:["Sample"]}]}]}]}," ",{p:[75,4,3007],t:7,e:"div",a:{"class":"col-md-4 col-sm-5 col-xs-6"},f:[{p:[76,5,3053],t:7,e:"div",a:{"class":"pricing-table pricing-table-bronze"},f:[{p:[77,6,3108],t:7,e:"div",a:{"class":"pricing-table-title"},f:["Bronze"]}," ",{p:[81,6,3177],t:7,e:"div",a:{"class":"pricing-table-body"},f:[{p:[82,7,3217],t:7,e:"div",a:{"class":"pricing-table-price"},f:["$150 ",{p:[84,8,3272],t:7,e:"div",f:["/month"]}]}," ",{p:[87,7,3313],t:7,e:"ul",f:[{p:[88,8,3326],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Logo + link in header"]}," ",{p:[89,8,3396],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Blog post announcing the sponsorship"]}," ",{p:[90,8,3481],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Tweet"]}," ",{p:[91,8,3535],t:7,e:"li",f:["Logo + link below Gold sponsors in \"Sponsors\" page. No description"]}," ",{p:[92,8,3619],t:7,e:"li",a:{"class":"pricing-table-disabled"},f:["Mentions future in blog posts on third-party websites"]}]}]}," ",{p:[96,6,3747],t:7,e:"div",a:{"class":"pricing-table-footer"},f:[{p:[97,7,3789],t:7,e:"a",a:{href:"mailto:contact@jsdelivr.com?subject=Bronze%20sponsor","class":"btn btn-become-a-sponsor"},f:["Become a sponsor"]}," ",{p:[98,7,3913],t:7,e:"a",a:{"class":"pricing-table-sponsor-sample",href:"/sponsors/our-sponsors#gold"},f:["Sample"]}]}]}]}," ",{p:[103,4,4041],t:7,e:"div",a:{"class":"col-md-4 col-sm-5 col-xs-6"},f:[{p:[104,5,4087],t:7,e:"div",a:{"class":"pricing-table pricing-table-custom"},f:[{p:[105,6,4142],t:7,e:"div",a:{"class":"pricing-table-title"},f:["Custom"]}," ",{p:[109,6,4211],t:7,e:"div",a:{"class":"pricing-table-body"},f:[{p:[110,7,4251],t:7,e:"img",a:{src:"/img/sponsors/become-a-sponsor/custom.png"}}," ",{p:[112,7,4314],t:7,e:"p",f:["For companies that want to offer a smaller or bigger amount than the one listed above and/or has custom requirements from jsDelivr."]}]}," ",{p:[117,6,4491],t:7,e:"div",a:{"class":"pricing-table-footer"},f:[{p:[118,7,4533],t:7,e:"a",a:{href:"mailto:contact@jsdelivr.com?subject=Custom%20sponsor","class":"btn btn-become-a-sponsor btn-default"},f:["Become a sponsor"]}]}]}]}]}]}]}]},
		components:{	SponsorsSidebar: sponsors_sidebar,
		Header: header}
	},
	cBecomeASponsor__component={},
	cBecomeASponsor____prop__,
	cBecomeASponsor____export__;


		cBecomeASponsor__component.exports = {
			data: function () {
				return {
					title: 'Become a sponsor - jsDelivr',
				};
			},
		};

	if ( typeof cBecomeASponsor__component.exports === "object" ) {
		for ( cBecomeASponsor____prop__ in cBecomeASponsor__component.exports ) {
			if ( cBecomeASponsor__component.exports.hasOwnProperty(cBecomeASponsor____prop__) ) {
				cBecomeASponsor____options__[cBecomeASponsor____prop__] = cBecomeASponsor__component.exports[cBecomeASponsor____prop__];
			}
		}
	}

	cBecomeASponsor____export__ = Ractive.extend( cBecomeASponsor____options__ );

	var cBecomeASponsor = cBecomeASponsor____export__;

	var cOurSponsors____options__ = {
		template: {v:3,t:[{p:[4,1,134],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[4,14,147]}],query:[{t:2,r:"query",p:[4,30,163]}]}}," ",{p:[5,1,185],t:7,e:"SponsorsSidebar"}," ",{p:[7,1,224],t:7,e:"div",a:{"class":"our-sponsors sponsors"},f:[{p:[8,2,262],t:7,e:"div",a:{"class":"media-mentions"},f:[{p:[9,3,294],t:7,e:"h2",f:["Media Mentions and Links"]}," ",{p:[11,3,333],t:7,e:"ul",f:[{p:[12,4,342],t:7,e:"li",f:[{p:[13,5,352],t:7,e:"div",a:{"class":"media-mention-title"},f:["jsDelivr – The advanced open source public CDN"]}," ",{p:[17,5,458],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[18,6,497],t:7,e:"a",a:{href:"https://hacks.mozilla.org/2014/03/jsdelivr-the-advanced-open-source-public-cdn/"},f:["Mozilla Guest Blog Post"]}]}]}," ",{p:[22,4,643],t:7,e:"li",f:[{p:[23,5,653],t:7,e:"div",a:{"class":"media-mention-title"},f:["Interview with driving forces behind web dev projects jsDelivr & jSter"]}," ",{p:[27,5,783],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[28,6,822],t:7,e:"a",a:{href:"http://royal.pingdom.com/2013/05/22/web-dev-projects/"},f:["Pingdom Interview"]}]}]}," ",{p:[32,4,936],t:7,e:"li",f:[{p:[33,5,946],t:7,e:"div",a:{"class":"media-mention-title"},f:["Speed Up WordPress With the Free jsDelivr CDN"]}," ",{p:[37,5,1051],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[38,6,1090],t:7,e:"a",a:{href:"http://wpmu.org/speed-up-wordpress-with-the-free-jsdeliver-cdn/"},f:["wpmu.org"]}]}]}," ",{p:[42,4,1205],t:7,e:"li",f:[{p:[43,5,1215],t:7,e:"div",a:{"class":"media-mention-title"},f:["Integrated by WP SlimStat"]}," ",{p:[47,5,1300],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[48,6,1339],t:7,e:"a",a:{href:"http://wordpress.org/extend/plugins/wp-slimstat/"},f:["wordpress.org"]}]}]}," ",{p:[52,4,1444],t:7,e:"li",f:[{p:[53,5,1454],t:7,e:"div",a:{"class":"media-mention-title"},f:["jsDelivr Provides Free CDN Solution for Hosting Common Applications"]}," ",{p:[57,5,1581],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[58,6,1620],t:7,e:"a",a:{href:"http://www.cdn-advisor.com/jsdelivr-provides-free-cdn-solution-for-hosting-common-applications/"},f:["cdn-advisor.com"]}]}]}," ",{p:[62,4,1774],t:7,e:"li",f:[{p:[63,5,1784],t:7,e:"div",a:{"class":"media-mention-title"},f:["Latest WordPress Plugins To Jump Start Your Website"]}," ",{p:[67,5,1895],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[68,6,1934],t:7,e:"a",a:{href:"http://www.dezignmatterz.com/best-wordpress-plugins-2012/"},f:["dezignmatterz.com"]}]}]}," ",{p:[72,4,2052],t:7,e:"li",f:[{p:[73,5,2062],t:7,e:"div",a:{"class":"media-mention-title"},f:["How To Make Your WordPress Site Load Faster in 2013"]}," ",{p:[77,5,2173],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[78,6,2212],t:7,e:"a",a:{href:"http://www.iblogzone.com/2013/01/make-your-wordpress-site-load-faster-2013.html"},f:["iblogzone.com"]}]}]}," ",{p:[82,4,2348],t:7,e:"li",f:[{p:[83,5,2358],t:7,e:"div",a:{"class":"media-mention-title"},f:["10 Handy WordPress Plugins to Improve Page Loading Speed"]}," ",{p:[87,5,2474],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[88,6,2513],t:7,e:"a",a:{href:"http://www.wpsquare.com/wordpress-plugins-improve-loading-speed/"},f:["wpsquare.com"]}]}]}," ",{p:[92,4,2633],t:7,e:"li",f:[{p:[93,5,2643],t:7,e:"div",a:{"class":"media-mention-title"},f:["jsDelivr WordPress CDN Plugin"]}," ",{p:[97,5,2732],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[98,6,2771],t:7,e:"a",a:{href:"http://tech.graphicline.co.za/jsdelivr-wordpress-cdn-plugin-review/"},f:["tech.graphicline.co.za"]}]}]}," ",{p:[102,4,2904],t:7,e:"li",f:[{p:[103,5,2914],t:7,e:"div",a:{"class":"media-mention-title"},f:["jsDelivr - A Free CDN For JavaScript And jQuery Plugins"]}," ",{p:[107,5,3029],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[108,6,3068],t:7,e:"a",a:{href:"http://www.functionn.in/2012/06/jsdelivr-free-cdn-for-javascript-and.html"},f:["functionn.in"]}]}]}," ",{p:[112,4,3197],t:7,e:"li",f:[{p:[113,5,3207],t:7,e:"div",a:{"class":"media-mention-title"},f:["14 CDN Providers to Make WordPress Blazing Fast"]}," ",{p:[117,5,3314],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[118,6,3353],t:7,e:"a",a:{href:"http://wpmu.org/14-cdn-providers-to-make-wordpress-blazing-fast/"},f:["wpmu.org"]}]}]}," ",{p:[122,4,3469],t:7,e:"li",f:[{p:[123,5,3479],t:7,e:"div",a:{"class":"media-mention-title"},f:["10 Plugins to Make WordPress Blazing Fast"]}," ",{p:[127,5,3580],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[128,6,3619],t:7,e:"a",a:{href:"http://wpmu.org/10-plugins-to-make-wordpress-blazing-fast/"},f:["wpmu.org"]}]}]}," ",{p:[132,4,3729],t:7,e:"li",f:[{p:[133,5,3739],t:7,e:"div",a:{"class":"media-mention-title"},f:["The Complete Guide to Free & Paid WordPress CDN Services"]}," ",{p:[137,5,3855],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[138,6,3894],t:7,e:"a",a:{href:"http://wplift.com/wordpress-cdn-services"},f:["wplift.com"]}]}]}," ",{p:[142,4,3988],t:7,e:"li",f:[{p:[143,5,3998],t:7,e:"div",a:{"class":"media-mention-title"},f:["Acelera tu sitio web con CDN gratuito de jsDelivr para WordPress (Spanish)"]}," ",{p:[147,5,4132],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[148,6,4171],t:7,e:"a",a:{href:"http://mvkoen.com/cdn-gratuito-de-jsdelivr-para-wordpress/"},f:["mvkoen.com"]}]}]}," ",{p:[152,4,4283],t:7,e:"li",f:[{p:[153,5,4293],t:7,e:"div",a:{"class":"media-mention-title"},f:["Обзор бесплатного CDN-хостинга JS библиотек jsDelivr (Russian)"]}," ",{p:[157,5,4415],t:7,e:"div",a:{"class":"media-mention-link"},f:[{p:[158,6,4454],t:7,e:"a",a:{href:"http://habrahabr.ru/post/168329/"},f:["habrahabr.ru"]}]}]}]}]}," ",{p:[164,2,4558],t:7,e:"div",a:{"class":"container"},f:[{p:[165,3,4585],t:7,e:"div",a:{"class":"row"},f:[{p:[166,4,4607],t:7,e:"div",a:{"class":"col-md-10 col-md-offset-6 col-sm-12 col-sm-offset-5 col-xs-8 col-xs-offset-7"},f:[{p:[167,5,4703],t:7,e:"h1",f:["Our sponsors"]}]}]}]}," ",{p:[172,2,4759],t:7,e:"div",a:{"class":"container our-sponsors-content-wrapper"},f:[{p:[173,3,4815],t:7,e:"div",a:{"class":"row"},f:[{p:[174,4,4837],t:7,e:"div",a:{"class":"col-xs-14 col-xs-offset-1"},f:[{p:[175,5,4882],t:7,e:"section",a:{"class":"our-sponsors-platinum"},f:[{p:[176,6,4928],t:7,e:"h3",a:{id:"platinum"},f:[{p:[176,24,4946],t:7,e:"span",f:["Platinum"]}]}," ",{p:[178,6,4981],t:7,e:"div",a:{"class":"row"},f:[{p:[179,7,5006],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[180,8,5047],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[181,9,5091],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[182,10,5133],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/platinum/cloudflare.png"}}]}," ",{p:[185,9,5223],t:7,e:"p",f:["Main backend CDN for jsDelivr offering unlimited bandwidth and locations. \"Offers free and commercial, cloud-based services to help secure and accelerate websites.\""]}," ",{p:[190,9,5437],t:7,e:"a",a:{target:"_blank",href:"https://www.cloudflare.com/"},f:[{p:[190,63,5491],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}," ",{p:[194,7,5573],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[195,8,5614],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[196,9,5658],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[197,10,5700],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/platinum/maxcdn.png"}}]}," ",{p:[200,9,5786],t:7,e:"p",f:["Main backend CDN for jsDelivr offering unlimited bandwidth and locations. \"Make your websites and apps faster, purge and provision content instantly, and get CDN analytics in real time.\""]}," ",{p:[205,9,6022],t:7,e:"a",a:{target:"_blank",href:"http://tracking.maxcdn.com/c/47243/36539/378"},f:[{p:[205,80,6093],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}," ",{p:[209,7,6175],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[210,8,6216],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[211,9,6260],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[212,10,6302],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/platinum/keycdn.png"}}]}," ",{p:[215,9,6388],t:7,e:"p",f:["Main backend CDN for jsDelivr offering unlimited bandwidth and locations. \"KeyCDN is a high performance CDN. Our global delivery network instantly speed up your websites, online games or live streams.\""]}," ",{p:[220,9,6639],t:7,e:"a",a:{target:"_blank",href:"https://www.keycdn.com/"},f:[{p:[220,59,6689],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}," ",{p:[224,7,6771],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[225,8,6812],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[226,9,6856],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[227,10,6898],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/platinum/cedexis.png"}}]}," ",{p:[230,9,6985],t:7,e:"p",f:["Load-balancer based on RUM and uptime data with real time performance monitoring. \"Optimize clouds, data centers and CDN content delivery to improve the availability, latency and throughput of your website and mobile apps, for every user on the globe.\""]}," ",{p:[236,9,7297],t:7,e:"a",a:{target:"_blank",href:"http://www.cedexis.com/"},f:[{p:[236,59,7347],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}," ",{p:[240,7,7429],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[241,8,7470],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[242,9,7514],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[243,10,7556],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/platinum/nsone.png"}}]}," ",{p:[246,9,7641],t:7,e:"p",f:["Our exclusive DNS hosting provider offering unlimited DNS queries and an additional layer of failover. \"Industry leading DNS traffic management - managed DNS, private DNS networks, and powerful turnkey traffic routing setups.\""]}," ",{p:[251,9,7917],t:7,e:"a",a:{target:"_blank",href:"https://nsone.net/"},f:[{p:[251,54,7962],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}]}]}," ",{p:[257,5,8071],t:7,e:"div",a:{"class":"our-sponsors-become-a-sponsor"},f:[{p:[258,6,8121],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/megaphone.png","class":"pull-left"}}," Want to become a sponsor? ",{p:[260,32,8226],t:7,e:"span",f:[{p:[260,38,8232],t:7,e:"a",a:{href:"/sponsors/become-a-sponsor"},f:["Click here"]}," for more details"]}," ",{p:[262,6,8316],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/megaphone.png",style:"float: right; transform: rotateY(180deg);"}}]}," ",{p:[265,5,8438],t:7,e:"section",a:{"class":"our-sponsors-gold"},f:[{p:[266,6,8480],t:7,e:"h3",a:{id:"gold"},f:[{p:[266,20,8494],t:7,e:"span",f:["Gold"]}]}," ",{p:[268,6,8525],t:7,e:"div",a:{"class":"row"},f:[{p:[269,7,8550],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[270,8,8591],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[271,9,8635],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[272,10,8677],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/gold/algolia.png"}}]}," ",{p:[275,9,8760],t:7,e:"p",f:["Algolia Search provides hosted full-text, numerical, faceted and geolocalized search."]}," ",{p:[279,9,8885],t:7,e:"a",a:{target:"_blank",href:"https://www.algolia.com/"},f:[{p:[279,60,8936],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}," ",{p:[283,7,9018],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[284,8,9059],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[285,9,9103],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[286,10,9145],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/gold/quantil.png"}}]}," ",{p:[289,9,9228],t:7,e:"p",f:["Global acceleration of Mobile, Website, Download and Video content for both the middle- and last-mile."]}," ",{p:[293,9,9370],t:7,e:"a",a:{target:"_blank",href:"https://www.quantil.com/"},f:[{p:[293,60,9421],t:7,e:"i",a:{"class":"fa fa-link"}},"Go to website"]}]}]}]}]}," ",{p:[299,5,9530],t:7,e:"section",a:{"class":"our-sponsors-bronze"},f:[{p:[300,6,9574],t:7,e:"h3",a:{id:"bronze"},f:[{p:[300,22,9590],t:7,e:"span",f:["Bronze"]}]}," ",{p:[302,6,9623],t:7,e:"div",a:{"class":"row"},f:[{p:[303,7,9648],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[304,8,9689],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[305,9,9733],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[306,10,9775],t:7,e:"a",a:{target:"_blank",href:"https://www.tutum.co/"},f:[{p:[306,58,9823],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/bronze/tutum.png"}}]}]}]}]}," ",{p:[311,7,9937],t:7,e:"div",a:{"class":"col-md-8 col-xs-12"},f:[{p:[312,8,9978],t:7,e:"div",a:{"class":"our-sponsors-sponsor"},f:[{p:[313,9,10022],t:7,e:"div",a:{"class":"our-sponsors-logo"},f:[{p:[314,10,10064],t:7,e:"a",a:{target:"_blank",href:"https://www.statuspage.io/"},f:[{p:[314,63,10117],t:7,e:"img",a:{src:"/img/sponsors/our-sponsors/bronze/statuspage.png"}}]}]}]}]}]}]}]}]}]}]}]},
		components:{	SponsorsSidebar: sponsors_sidebar,
		Header: header}
	},
	cOurSponsors__component={},
	cOurSponsors____prop__,
	cOurSponsors____export__;


		cOurSponsors__component.exports = {
			data: function () {
				return {
					title: 'Our sponsors - jsDelivr',
				};
			},
			onrender: function () {
				$('.our-sponsors-platinum > .row').shuffle('.col-md-8.col-xs-12');
				$('.our-sponsors-gold > .row').shuffle('.col-md-8.col-xs-12');
				$('.our-sponsors-bronze > .row').shuffle('.col-md-8.col-xs-12');
			}
		};

	if ( typeof cOurSponsors__component.exports === "object" ) {
		for ( cOurSponsors____prop__ in cOurSponsors__component.exports ) {
			if ( cOurSponsors__component.exports.hasOwnProperty(cOurSponsors____prop__) ) {
				cOurSponsors____options__[cOurSponsors____prop__] = cOurSponsors__component.exports[cOurSponsors____prop__];
			}
		}
	}

	cOurSponsors____export__ = Ractive.extend( cOurSponsors____options__ );

	var cOurSponsors = cOurSponsors____export__;

	"use strict";

	var utils_debounce = function (fn) {
		var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

		var timeout = undefined;

		return function () {
			clearTimeout(timeout);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			timeout = setTimeout.apply(undefined, [fn, wait].concat(args));
		};
	}

	var cStatistics____options__ = {
		template: {v:3,t:[{p:[3,1,66],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[3,14,79]}],query:[{t:2,r:"query",p:[3,30,95]}]}}," ",{p:[5,1,119],t:7,e:"div",a:{"class":"statistics",style:[{t:4,f:["background-color: #fff;"],n:50,x:{r:["stats.lastUpdate"],s:"!_0"},p:[5,32,150]}]},f:[{p:[6,2,210],t:7,e:"div",a:{"class":"container"},f:[{t:4,f:[{p:[8,4,267],t:7,e:"div",a:{"class":"text-center"},f:[{p:[9,5,298],t:7,e:"h2",f:["Loading..."]}]}],n:50,x:{r:["stats.lastUpdate"],s:"!_0"},p:[7,3,237]},{t:4,n:51,f:[{p:[12,4,345],t:7,e:"div",a:{"class":"row"},f:[{p:[13,5,368],t:7,e:"div",a:{"class":"col-xs-12 col-xs-offset-6"},f:[{p:[14,6,414],t:7,e:"h1",a:{"class":"text-center"},f:["TOTAL CDN STATS",{p:[15,22,461],t:7,e:"br"}," ",{p:[16,7,473],t:7,e:"small",a:{"class":"text-center"},f:["(last 30 days)"]}]}]}," ",{p:[20,5,554],t:7,e:"div",a:{"class":"col-xs-5"},f:[{p:[21,6,583],t:7,e:"div",a:{"class":"stats-subtitle stats-last-update"},f:["Last update: ",{t:2,x:{r:["formatDate","stats.lastUpdate"],s:"_0(_1)"},p:[22,20,650]}]}]}]}," ",{p:[27,4,725],t:7,e:"div",a:{"class":"row"},f:[{p:[28,5,748],t:7,e:"div",a:{"class":"col-md-7 col-md-offset-1 col-sm-7 col-sm-offset-1 col-xs-10 col-xs-offset-2 xs-padding"},f:[{p:[29,6,855],t:7,e:"div",a:{"class":"stats-box"},f:[{p:[30,7,886],t:7,e:"div",a:{"class":"stats-title"},f:["LOAD BALANCING DECISIONS"]}," ",{p:[31,7,949],t:7,e:"div",a:{"class":"stats-number"},f:[{t:2,x:{r:["formatNumber","stats.cedexis.total"],s:"_0(_1)"},p:[31,33,975]}]}]}]}," ",{p:[35,5,1051],t:7,e:"div",a:{"class":"col-md-6 col-md-offset-1 col-sm-8 col-sm-offset-0 col-xs-10 col-xs-offset-1 xs-padding"},f:[{p:[36,6,1158],t:7,e:"div",a:{"class":"stats-box"},f:[{p:[37,7,1189],t:7,e:"div",a:{"class":"stats-title"},f:["HTTP HITS"]}," ",{p:[38,7,1237],t:7,e:"div",a:{"class":"stats-number"},f:[{t:2,x:{r:["formatNumber","stats.cdn.total.hits"],s:"_0(_1)"},p:[38,33,1263]}]}," ",{p:[39,7,1315],t:7,e:"div",a:{"class":"stats-traffic"},f:[{p:[39,34,1342],t:7,e:"span",a:{"class":"stats-number"},f:[{t:2,x:{r:["stats.cdn.total.traffic"],s:"Math.floor(_0/1024/1024/1024/1024)"},p:[39,61,1369]},"TB"]}," SERVED"]}]}]}," ",{p:[43,5,1491],t:7,e:"div",a:{"class":"col-md-7 col-md-offset-1 col-sm-7 col-sm-offset-0 col-xs-11 col-xs-offset-7"},f:[{p:[44,6,1587],t:7,e:"div",a:{"class":"stats-box"},f:[{p:[45,7,1618],t:7,e:"div",a:{"class":"stats-title"},f:["DNS REQUESTS"]}," ",{p:[46,7,1669],t:7,e:"div",a:{"class":"stats-number"},f:[{t:2,x:{r:["formatNumber","stats.dns.total"],s:"_0(_1)"},p:[46,33,1695]}]}]}]}]}," ",{p:[51,4,1777],t:7,e:"div",a:{"class":"row"},f:[{p:[52,5,1800],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-xs-22 col-xs-offset-1"},f:[{p:[53,6,1872],t:7,e:"h3",f:["Load Balancing decisions"]}," ",{p:[55,6,1914],t:7,e:"div",a:{id:"load-balancing"}}]}," ",{p:[58,5,1965],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-xs-22 col-xs-offset-1"},f:[{p:[59,6,2037],t:7,e:"h3",f:["DNS requests"]}," ",{p:[61,6,2067],t:7,e:"div",a:{id:"dns-requests"}}]}]}," ",{p:[65,4,2126],t:7,e:"div",a:{"class":"row"},f:[{p:[66,5,2149],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-xs-22 col-xs-offset-1"},f:[{p:[67,6,2221],t:7,e:"h3",f:["Load Balancing decisions map"]}," ",{p:[69,6,2267],t:7,e:"div",a:{id:"load-balancing-map"}}]}]}," ",{p:[73,4,2332],t:7,e:"div",a:{"class":"row"},f:[{p:[74,5,2355],t:7,e:"div",a:{"class":"col-md-14 col-md-offset-5 col-xs-22 col-xs-offset-1"},f:[{p:[75,6,2427],t:7,e:"h3",f:["Performance map ",{p:[77,7,2462],t:7,e:"span",a:{"class":"stats-subtitle"},f:["Based on tens of millions of RUM tests for the last 24 hours"]}]}," ",{p:[80,6,2579],t:7,e:"div",a:{id:"performance-map"}}]}]}],x:{r:["stats.lastUpdate"],s:"!_0"}}]}]}]},
		components:{	Header: header}
	},
	cStatistics__component={},
	cStatistics____prop__,
	cStatistics____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/debounce': utils_debounce
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		var debounce = require('public/js/utils/debounce');
		var loading = 3;
		var stats;

		cStatistics__component.exports = {
			data: function () {
				return {
					title: 'Statistics - jsDelivr',
					stats: stats,
					formatDate: formatDate,
					formatNumber: formatNumber,
				};
			},
			oninit: function () {
				if (!Ractive.isServer) {
					var _this = this;

					google.load('visualization', '1.1', {
						packages: [ 'corechart', 'geochart' ],
						language: 'en',
						callback: onLoad,
					});

					if (!stats) {
						$.getJSON('/api/stats', function (data) {
							stats = data;

							// Convert UNIX timestamps to Date objects.
							stats.cedexis.decisions.forEach(function (entry) {
								entry[0] = new Date(entry[0] * 1000);
							});

							stats.dns.chart.forEach(function (entry) {
								entry[0] = new Date(entry[0] * 1000);
							});

							stats.cedexis.map.forEach(function (entry) {
								entry[2] = '<span class="total-hits">' + formatNumber(entry[1]) + '</span><img src="data:image/png;base64,' + entry[2] + '">';
							});

							_this.set('stats', stats);
							onLoad();
						});
					}
				}
			},
			onrender: function () {
				var onResize = debounce(draw);

				$(window).on('resize', onResize);
				this.on('unrender', function () {
					$(window).off('rezize', onResize);
				});

				onLoad();
			},
		};

		function onLoad () {
			if (--loading <= 0) {
				draw()
			}
		}

		function draw () {
			if (loading <= 0) {
				var lineChartDefaults = {
					backgroundColor: {
						stroke: '#cee1e1',
						strokeWidth: 4,
					},
					chartArea: {
						left: 100,
						top: 30,
						height: 350,
						width: '85%',
					},
					colors: [ '#3a46b6', '#920784', '#20a9e9', '#d41800' ],
					curveType: 'function',
					focusTarget: 'category',
					fontName: 'Open Sans',
					fontSize: 13,
					hAxis: {
						format: 'MMM d, y',
						gridlines: {
							color: '#dee2e6',
						},
						title: 'Date',
						titleTextStyle: {
							fontSize: 12,
							bold: true,
							italic: false,
						}
					},
					height: 480,
					legend: {
						position: 'bottom',
					},
					tooltip: {
						isHtml: true,
						trigger: 'both',
						textStyle: {
							color: '#fff',
						}
					},
					vAxis: {
						baseline: 0,
						baselineColor: '#dee2e6',
						format: 'decimal',
						gridlines: {
							color: '#dee2e6',
							count: -1,
						},
					},
					width: '100%',
				};
				var mapChartDefaults = {
					legend: {
						position: 'none',
					},
					tooltip: {
						isHtml: true,
						trigger: 'both',
						textStyle: {
							color: '#fff',
						},
					},
				};
				var numberFormatter = new google.visualization.NumberFormat({ fractionDigits: 0 });
				var perfFormatter = new google.visualization.NumberFormat({ fractionDigits: 0, suffix: ' ms' });

				// Load balancing.
				var loadBalancingData = new google.visualization.DataTable();

				loadBalancingData.addColumn('date', 'Date');
				loadBalancingData.addColumn('number', 'MaxCDN');
				loadBalancingData.addColumn('number', 'CloudFlare');
				loadBalancingData.addColumn('number', 'KeyCDN');
				loadBalancingData.addColumn('number', 'Quantil');
				loadBalancingData.addRows(stats.cedexis.decisions);

				numberFormatter.format(loadBalancingData, 1);
				numberFormatter.format(loadBalancingData, 2);
				numberFormatter.format(loadBalancingData, 3);
				numberFormatter.format(loadBalancingData, 4);

				var loadBalancingChart = new google.visualization.LineChart($('#load-balancing')[0]);
				loadBalancingChart.draw(loadBalancingData, lineChartDefaults);

				// DNS.
				var dnsData = new google.visualization.DataTable();

				dnsData.addColumn('date', 'Date');
				dnsData.addColumn('number', 'Requests');
				dnsData.addRows(stats.dns.chart);

				numberFormatter.format(dnsData, 1);

				var dnsChart = new google.visualization.LineChart($('#dns-requests')[0]);
				dnsChart.draw(dnsData, $.extend(true, {}, lineChartDefaults, {
					chartArea: {
						width: '83%',
					},
					legend: {
						position: 'none',
					},
				}));

				// Load balancing map.
				var mapData = new google.visualization.DataTable();

				mapData.addColumn('string', 'Country');
				mapData.addColumn('number', 'Decisions');
				mapData.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
				mapData.addRows(stats.cedexis.map);

				numberFormatter.format(mapData, 1);

				var mapChart = new google.visualization.GeoChart($('#load-balancing-map')[0]);
				mapChart.draw(mapData, $.extend(true, {
					colorAxis: {
						colors: [ '#46a3d5', '#a9edd9', '#ffee99', '#f9a674', '#f08c6b', '#dc5559' ],
						maxValue: 60000000,
					},
				}, mapChartDefaults));

				// Performance map.
				var perfMapData = new google.visualization.DataTable();

				perfMapData.addColumn('string', 'Country');
				perfMapData.addColumn('number', 'HTTP load time');
				perfMapData.addRows(stats.cedexis.perfmap);

				perfFormatter.format(perfMapData, 1);

				var perfMapChart = new google.visualization.GeoChart($('#performance-map')[0]);
				perfMapChart.draw(perfMapData, $.extend(true, {
					colorAxis: {
						colors: [ '#46a3d5', '#a9edd9', '#ffee99', '#f9a674', '#f08c6b', '#dc5559' ],
						maxValue: 200,
					},
				}, mapChartDefaults));
			}
		}

		function formatDate (date) {
			return new Date(date).toLocaleString('en', {
				hour12: false,
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			});
		}

		function formatNumber (number) {
			return number.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&,');
		}

	if ( typeof cStatistics__component.exports === "object" ) {
		for ( cStatistics____prop__ in cStatistics__component.exports ) {
			if ( cStatistics__component.exports.hasOwnProperty(cStatistics____prop__) ) {
				cStatistics____options__[cStatistics____prop__] = cStatistics__component.exports[cStatistics____prop__];
			}
		}
	}

	cStatistics____export__ = Ractive.extend( cStatistics____options__ );

	})();


	var cStatistics = cStatistics____export__;

	"use strict";

	var test_string_js = "/* Copyright 2012 Cedexis Inc. */\n\n(function() {\n    var s = new Date();\n    if ('object' === typeof window.radar) {\n        window.radar.stoppedAt = s;\n    }\n})();\n";

	var cDebugTool____options__ = {
		template: {v:3,t:[{p:[3,1,67],t:7,e:"Header",a:{app:[{t:2,r:"app",p:[3,14,80]}],query:[{t:2,r:"query",p:[3,30,96]}]}}," ",{p:[5,1,120],t:7,e:"div",a:{"class":"debug-tool tools"},f:[{p:[6,2,153],t:7,e:"div",a:{"class":"container"},f:[{p:[7,3,180],t:7,e:"div",a:{"class":"row"},f:[{p:[8,4,202],t:7,e:"div",a:{"class":"col-md-12 col-md-offset-6 col-xs-16 col-xs-offset-4"},f:[{p:[9,5,273],t:7,e:"h1",a:{"class":"text-center"},f:["Debug tool"]}," ",{p:[11,5,320],t:7,e:"div",a:{"class":"debug-tool-results"},f:[{t:4,f:[{p:[13,7,391],t:7,e:"div",a:{"class":"running-tests"},f:["Running tests... ",{p:[16,8,454],t:7,e:"div",a:{"class":"progress"},f:[{p:[17,9,486],t:7,e:"div",a:{"class":"progress-bar",role:"progressbar",style:["width: ",{t:2,r:"progress",p:[17,68,545]},"%"]}}]}]}],n:50,x:{r:["progress"],s:"_0!==100"},p:[12,6,359]},{t:4,n:51,f:[{p:[21,7,618],t:7,e:"div",a:{"class":"debug-tool-results-header"},f:[{p:[22,8,666],t:7,e:"button",v:{click:{m:"test",a:{r:[],s:"[]"}}},a:{"class":"btn btn-default"},f:[{p:[23,9,726],t:7,e:"i",a:{"class":"fa fa-refresh"}},"Reload"]}," ",{t:4,f:[{p:[27,9,816],t:7,e:"button",a:{"class":"btn btn-default","data-clipboard-text":[{t:2,r:"link",p:[27,88,895]}]},o:"zeroClipboard",f:[{p:[28,10,916],t:7,e:"i",a:{"class":"fa fa-copy"}},"Copy"]}],n:50,r:"hasFlash",p:[26,8,790]}," ",{t:4,f:["Showing results for IP address ",{p:[33,40,1055],t:7,e:"strong",f:[{t:2,r:"results.ipInfo.ip",p:[33,48,1063]}]}," from ",{t:2,r:"results.now",p:[33,84,1099]},"."],n:50,r:"saved",p:[32,8,1001]}]}," ",{p:[37,7,1161],t:7,e:"div",a:{"class":"debug-tool-results-body"},f:[{p:[38,8,1207],t:7,e:"span",a:{"class":"results-date"},f:[{t:2,r:"results.now",p:[38,35,1234]}]},{p:[38,57,1256],t:7,e:"br"}," ",{t:4,f:[{p:[41,9,1305],t:7,e:"br"},{p:[41,13,1309],t:7,e:"strong",f:[{t:2,r:"tests.ipInfo",p:[41,21,1317]}]},{p:[41,46,1342],t:7,e:"br"}," ",{t:4,f:[{t:2,r:"error",p:[44,10,1382]},{p:[44,19,1391],t:7,e:"br"}],n:50,r:"error",p:[43,9,1358]},{t:4,n:51,f:[{t:4,f:[{t:2,r:"@key",p:[47,11,1450]},": ",{t:2,r:".",p:[47,21,1460]},{p:[47,29,1468],t:7,e:"br"}],n:52,r:".",p:[46,10,1424]}],r:"error"}],n:53,r:"results.ipInfo",p:[40,8,1271]}," ",{p:[52,8,1564],t:7,e:"br"},{p:[52,12,1568],t:7,e:"strong",f:[{t:2,r:"tests.server",p:[52,20,1576]}]},{p:[52,45,1601],t:7,e:"br"}," ",{t:2,r:"results.server",p:[53,8,1614]},{p:[53,26,1632],t:7,e:"br"}," ",{t:4,f:[{p:[56,9,1678],t:7,e:"br"},{p:[56,13,1682],t:7,e:"strong",f:[{t:2,r:"dnsTests.dns",p:[56,21,1690]}]},{p:[56,46,1715],t:7,e:"br"}," ",{t:2,r:".",p:[57,9,1729]},{p:[57,17,1737],t:7,e:"br"}],n:53,r:"results.dns",p:[55,8,1647]}," ",{t:4,f:[{p:[61,9,1817],t:7,e:"br"},{p:[61,13,1821],t:7,e:"strong",f:[{t:2,rx:{r:"tests.servers",m:[{t:30,n:"@index"}]},p:[61,21,1829]}]},{p:[61,55,1863],t:7,e:"br"}," ",{t:2,r:".",p:[62,9,1877]},{p:[62,17,1885],t:7,e:"br"}],n:52,r:"results.servers",p:[60,8,1782]}," ",{t:4,f:[{p:[66,9,1974],t:7,e:"br"},{p:[66,13,1978],t:7,e:"strong",f:[{t:2,rx:{r:"dnsTests.availability",m:[{t:30,n:"@index"}]},p:[66,21,1986]}]},{p:[66,63,2028],t:7,e:"br"}," ",{t:4,f:[{t:2,r:"error",p:[69,10,2068]},{p:[69,19,2077],t:7,e:"br"}],n:50,r:"error",p:[68,9,2044]},{t:4,n:51,f:[{t:4,f:[{t:2,r:"@key",p:[72,11,2136]},": ",{t:2,r:".",p:[72,21,2146]},{p:[72,29,2154],t:7,e:"br"}],n:52,r:".",p:[71,10,2110]}],r:"error"}],n:52,r:"results.availability",p:[65,8,1934]}," ",{t:4,f:[{p:[78,9,2295],t:7,e:"br"},{p:[78,13,2299],t:7,e:"strong",f:[{t:2,rx:{r:"dnsTests.performance",m:[{t:30,n:"@index"}]},p:[78,21,2307]}]},{p:[78,62,2348],t:7,e:"br"}," ",{t:2,r:".",p:[79,9,2362]},{p:[79,17,2370],t:7,e:"br"}],n:52,r:"results.performance",p:[77,8,2256]}]}],x:{r:["progress"],s:"_0!==100"}}]}]}]}]}]}]},
		components:{	Header: header}
	},
	cDebugTool__component={},
	cDebugTool____prop__,
	cDebugTool____export__;
	(function () {
		var __dependencies__ = {
				'public/js/utils/test-string.js': test_string_js,
			'public/js/decorators/zero-clipboard.js': zero_clipboard_js
		};

		var require = function ( path ) {
			if ( __dependencies__.hasOwnProperty( path ) ) {
				return __dependencies__[ path ];
			}

			throw new Error( 'Could not find required module "' + path + '"' );
		}



		var testString = require('public/js/utils/test-string.js');
		var zeroClipboardDecorator = require('public/js/decorators/zero-clipboard.js');

		cDebugTool__component.exports = {
			decorators: {
				zeroClipboard: zeroClipboardDecorator
			},
			computed: {
				dnsTests: function () {
					var ip = this.get('results.ipInfo.ip').replace(/\./g, '-');
					var tests = {
						dns: '2-01-2cd3-000f.cdx-i-' + ip + '.cedexis.net',
						availability: [],
						performance: []
					};

					$.each(this.get('providers'), function (index, provider) {
						tests.availability.push(provider + '.avail.2-01-2cd3-0010.cdx-i-' + ip + '.cedexis.net');
						tests.performance.push(provider + '.http_rtt.2-01-2cd3-0010.cdx-i-' + ip + '.cedexis.net')
					});

					return tests;
				},
				progress: function () {
					var results = this.get('results');

					return (
						!!results.ipInfo
						+ !!results.server
						+ !!results.dns
						+ results.servers.concat(results.availability, results.performance).filter(function (i) { return i; }).length
					) / this.get('total') * 100;
				},
				resultsHash: {
					get: function () {
						if (this.get('progress') === 100) {
							return this.get('results');
						}
					},
					set: function (value) {
						this.set('results', value)
					}
				},
				total: function () {
					return 2 + this.get('tests.servers').length + 1 + 8;
				}
			},
			data: function () {
				return {
					title: 'Debug tool - jsDelivr',
					link: '',
					providers: [ 'cloudflare', 'maxcdn', 'keycdn', 'quantil' ],
					results: {
						availability: [],
						performance: [],
						servers: [],
					},
					tests: {
						ipInfo: 'http://ipinfo.io/json',
						server: 'http://cdn.jsdelivr.net/information.txt',
						servers: [
							'https://cdn.jsdelivr.net/r15lgc.js',
							'http://cdn.jsdelivr.net/r15lgc.js',
							'http://testingcf.jsdelivr.net/r15lgc.js',
							'http://jsdelivr3.dak.netdna-cdn.com/r15lgc.js',
							'http://jsdelivr-cb7.kxcdn.com/r15lgc.js',
							'http://quantil.jsdelivr.net/r15lgc.js',
						]
					}
				};
			},
			oninit: function () {
				if (!Ractive.isServer) {
					var _this = this;

					this.set('hasFlash', !ZeroClipboard.isFlashUnusable());

					this.observe('progress', function (value) {
						if (value === 100) {
							this.set('link', location.href);

							// Google is smart enough to return an existing URL if there is one.
							$.ajax({
								type: 'POST',
								contentType: 'application/json; charset=UTF-8',
								url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyB8DINjLBVWS7ImklEB1zOAS8QyuIGzB-Q',
								data: JSON.stringify({ longUrl: location.href }),
								success: function (response) {
									if (response.id) {
										_this.set('link', response.id);
									}
								}
							});
						}
					}, { defer: true });

					if (this.get('progress') === 100) {
						this.set('saved', true);
					} else {
						this.test();
					}
				}
			},
			test: function () {
				var _this = this;

				this.set({
					results: {
						now: new Date().toUTCString(),
						ipInfo: null,
						dns: null,
						availability: [],
						performance: [],
						server: null,
						servers: [],
					},
					saved: false,
				});

				$.ajax(this.get('tests.ipInfo'), {
					cache: false,
					success: function (response) {
						_this.set('results.ipInfo', response);
						_this.testDns();
					},
					error: function (jqXHR, textStatus, errorThrown) {
						_this.set('results.ipInfo', { error: errorThrown || textStatus });
					}
				});

				$.ajax(this.get('tests.server'), {
					cache: false,
					success: function (response, textStatus, jqXHR) {
						_this.set('results.server', jqXHR.getResponseHeader('POP') || jqXHR.getResponseHeader('Server') || 'Failed to identify the server.');
					},
					error: function (jqXHR, textStatus, errorThrown) {
						_this.set('results.server', errorThrown || textStatus);
					}
				});

				$.each(this.get('tests.servers'), function (index, entry) {
					$.ajax(entry, {
						cache: false,
						success: function (response) {
							_this.set('results.servers.' + index, response === testString ? 'OK' : 'Failed');
						},
						error: function (jqXHR, textStatus, errorThrown) {
							_this.set('results.servers.' + index, errorThrown || textStatus);
						}
					});
				});
			},
			testDns: function () {
				var _this = this;

				$.ajax('/api/dns', {
					cache: false,
					data: { domain: this.get('dnsTests.dns') },
					success: function (response) {
						_this.set('results.dns', response);
					},
					error: function (jqXHR, textStatus, errorThrown) {
						_this.set('results.dns', errorThrown || textStatus);
					}
				});

				$.each(this.get('dnsTests.availability'), function (index, entry) {
					$.ajax('/api/dns', {
						cache: false,
						data: { domain: entry },
						success: function (response) {
							var data = response.split('.');

							_this.set('results.availability.' + index, {
								availability: data[5] + '%',
								continent: data[0],
								country: data[1],
								asn: data[2],
							});
						},
						error: function (jqXHR, textStatus, errorThrown) {
							_this.set('results.availability.' + index, { error: errorThrown || textStatus });
						}
					});
				});

				$.each(this.get('dnsTests.performance'), function (index, entry) {
					$.ajax('/api/dns', {
						cache: false,
						data: { domain: entry },
						success: function (response) {
							_this.set('results.performance.' + index, response.split('.')[5] + ' ms');
						},
						error: function (jqXHR, textStatus, errorThrown) {
							_this.set('results.performance.' + index, errorThrown || textStatus);
						}
					});
				});
			}
		};

	if ( typeof cDebugTool__component.exports === "object" ) {
		for ( cDebugTool____prop__ in cDebugTool__component.exports ) {
			if ( cDebugTool__component.exports.hasOwnProperty(cDebugTool____prop__) ) {
				cDebugTool____options__[cDebugTool____prop__] = cDebugTool__component.exports[cDebugTool____prop__];
			}
		}
	}

	cDebugTool____export__ = Ractive.extend( cDebugTool____options__ );

	})();


	var cDebugTool = cDebugTool____export__;

	'use strict';

	Ractive.DEBUG = location.hostname === 'localhost';
	Ractive.defaults.isolated = true;

	if (!window.Promise) {
		window.Promise = Ractive.Promise;
	}

	var js_app__app = {
		config: {
			animateScrolling: true
		},
		sriHashes: {}
	};

	js_app__app.router = new Ractive.Router({
		el: '#page',
		data: function data() {
			return {
				app: js_app__app,
				collection: utils_has.localStorage() && localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : []
			};
		},
		globals: ['query', 'collection']
	});

	var routerDispatch = Ractive.Router.prototype.dispatch;

	Ractive.Router.prototype.dispatch = function () {
		routerDispatch.apply(this, arguments);

		document.title = js_app__app.router.route.view.get('title') || 'jsDelivr - A free super-fast CDN for developers and webmasters';

		ga('set', 'page', this.getUri());
		ga('send', 'pageview');

		return this;
	};

	js_app__app.router.addRoute('/', Ractive.extend(cIndex), { qs: ['query', 'limit'] });
	js_app__app.router.addRoute('/about', Ractive.extend(cAbout));
	js_app__app.router.addRoute('/consultation-services', Ractive.extend(cConsultationServices));
	js_app__app.router.addRoute('/features/multi-cdn-load-balancing', Ractive.extend(cMultiCdnLoadBalancing));
	js_app__app.router.addRoute('/features/jsdelivr-cdn-features', Ractive.extend(cJsdelivrCdnFeatures));
	js_app__app.router.addRoute('/features/network-map', Ractive.extend(cNetworkMap));
	js_app__app.router.addRoute('/features/cdn-in-asia-and-china', Ractive.extend(cCdnInAsiaAndChina));
	js_app__app.router.addRoute('/free-open-source-cdn/javascript-cdn', Ractive.extend(cJavascriptCdn));
	// app.router.addRoute('/free-open-source-cdn/wordpress-cdn', Ractive.extend(cWordPressCdn));
	// app.router.addRoute('/free-open-source-cdn/npm-cdn', Ractive.extend(cNpmCdn));
	js_app__app.router.addRoute('/free-open-source-cdn/custom-cdn-for-open-source', Ractive.extend(cCustomCdn));
	js_app__app.router.addRoute('/projects/:name', Ractive.extend(cProjects));
	js_app__app.router.addRoute('/sponsors/become-a-sponsor', Ractive.extend(cBecomeASponsor));
	js_app__app.router.addRoute('/sponsors/our-sponsors', Ractive.extend(cOurSponsors));
	js_app__app.router.addRoute('/statistics', Ractive.extend(cStatistics));
	js_app__app.router.addRoute('/tools/debug-tool', Ractive.extend(cDebugTool), { hash: ['resultsHash'] });
	js_app__app.router.addRoute('/(.*)', function () {
		location.pathname = '/';
	});

	$(function () {
		ZeroClipboard.config({
			swfPath: '//cdn.jsdelivr.net/zeroclipboard/2.2.0/ZeroClipboard.swf'
		});

		js_app__app.router.init().watchLinks().watchState();

		// The affix plugin sometimes applies incorrect css on page load; scrolling fixes the problem.
		setTimeout(function () {
			scrollBy(0, 1);
			scrollBy(0, -1);
		});
	});

	$.fn.shuffle = function (selector) {
		return this.each(function () {
			$(this).find(selector).sort(function () {
				return .5 - Math.random();
			}).detach().appendTo(this);
		});
	};

	window.app = js_app__app;

}));
//# sourceMappingURL=app.js.map
