! function(t, e) {
    function n(t) {
        var e = new RSAKey;
        return e.setPublic(o, "10001"), e.encrypt(encodeURIComponent(t))
    }
    var i = "/rest/accounts/",
        o = "D8CC0180AFCC72C9F5981BDB90A27928672F1D6EA8A57AF44EFFA7DAF6EFB17DAD9F643B9F9F7A1F05ACC2FEA8DE19F023200EFEE9224104627F1E680CE8F025AF44824A45EA4DDC321672D2DEAA91DB27418CFDD776848F27A76E747D53966683EFB00F7485F3ECF68365F5C10C69969AE3D665162D2EE3A5BA109D7DF6C7A5";
    t.accounts = {
        login: function(t, o, s) {
            t.password = n(t.password), e.ajax({
                url: i + "login",
                type: "POST",
                data: t,
                success: function(t) {
                    "SUCCESS" == t.result ? o && o(t) : s && s(t)
                },
                error: function() {
                    s && s()
                }
            })
        },
        logout: function(t, n) {
            e.ajax({
                url: i + "logout",
                type: "DELETE",
                success: function(e) {
                    "SUCCESS" == e.result ? t && t(e) : n && n(e.message)
                },
                error: function() {
                    n && n("璇锋眰閿欒")
                }
            })
        },
        register: function(t, o, s, a) {
            o.user_password && (o.user_password = n(o.user_password)), o.user_password2 && (o.user_password2 = n(o.user_password2)), e.ajax({
                url: i + "register/" + t,
                type: "POST",
                data: o,
                success: function(t) {
                    "SUCCESS" == t.result ? s && s(t) : a && a(t.message)
                },
                error: function() {
                    a && a("璇锋眰閿欒")
                }
            })
        },
        checkName: function(t, n, o) {
            e.ajax({
                url: i + "check-name/" + t,
                type: "GET",
                success: function(t) {
                    "SUCCESS" == t.result ? n && n(t) : o && o(t)
                },
                error: function() {
                    o && o()
                }
            })
        },
        checkMobile: function(t, n, o, s) {
            e.ajax({
                url: i + "check-mobile/" + t + "/" + n,
                type: "GET",
                success: function(t) {
                    "SUCCESS" == t.result ? o && o(t) : s && s(t)
                },
                error: function() {
                    s && s()
                }
            })
        }
    }
}(window.TuchongApi || (window.TuchongApi = {}), $),
    function(t, e) {
        t.notifications = {
            getAll: function(t, n) {
                e.ajax({
                    url: "/rest/2/users/self/notifications",
                    type: "GET",
                    success: function(e) {
                        "SUCCESS" == e.result ? t && t(e) : n && n(e.message)
                    },
                    error: function() {
                        n && n("璇锋眰閿欒")
                    }
                })
            },
            getList: function(t, n, i) {
                e.ajax({
                    url: "/rest/users/self/notification-list",
                    type: "GET",
                    data: t,
                    success: function(t) {
                        "SUCCESS" == t.result ? n && n(t) : i && i(t.message)
                    },
                    error: function() {
                        i && i("璇锋眰閿欒")
                    }
                })
            }
        }
    }(window.TuchongApi || (window.TuchongApi = {}), $),
    function(t) {
        t.lessThan = function(t, e) {
            return e > t ? t : e - 1 + "+"
        }
    }(window.Filter || (window.Filter = {})),
    function(t) {
        t.siteLink = function(t) {
            var e = 0 == t.site_id ? "" : "popover-action";
            return '<a href="' + t.url + '" data-popover-id="' + t.site_id + '" data-popover-type="user" class="site-link ' + e + '"data-site-id="' + t.site_id + '" target="_blank">' + _.escape(t.name) + "</a>"
        }, t.sitesLinks = function(e) {
            for (var n = [], i = 0, o = e.length; o > i && 7 > i; i++) n.push(t.siteLink(e[i]));
            return n.join("锛�") + (e.length > 7 ? " 绛�" : "")
        }, t.siteMapLinks = function(e, n) {
            for (var i = [], o = 0, s = e.length; s > o && 7 > o; o++) i.push(t.siteLink(n[e[o]]));
            return i.join("銆�") + (e.length > 7 ? " 绛�" : "")
        }, t.siteIcon = function(t) {
            var e = 0 == t.site_id ? ["site-icon"] : ["site-icon popover-action"],
                n = "",
                i = (t.verification_list || []).length;
            return 0 != i && (1 == i && (n = 2 == t.verification_list[0].verification_type ? '<i class="vip-yellow vip-right"></i>' : '<i class="vip-blue vip-right"></i>'), i > 1 && (n = '<i class="vip-yellow vip-right"></i><i class="vip-blue vip-left"></i>')), '<a href="' + t.url + '" class="' + e.join(" ") + '" data-site-id="' + t.site_id + '" data-popover-id="' + t.site_id + '" data-popover-type="user" target="_blank">' + n + '<img src="' + t.icon + '" alt="' + _.escape(t.name) + '"></a>'
        }, t.siteDesc = function(t) {
            return t.description
        }
    }(window.Filter || (window.Filter = {})), define("notify", function() {
    var t = '<% if(unread_messages > 0) { %>\n<li class="unread-messages">\n	浣犳湁 <a href="<%=SERVER%>messages/system" target="_blank"><%=unread_messages%>鏉＄珯鍐呬俊</a>\n</li>\n<% } %>\n\n<% if(unread_notifications > 0) { %>\n<li class="unread-notifications">\n	浣犳湁 <a href="<%=SERVER%>messages/system?tab=1" target="_blank"><%=unread_notifications%>鏉℃湭璇荤殑閫氱煡</a>\n</li>\n<% } %>\n\n<% if(unread_followers > 0) { %>\n<li class="unread-followers">\n	浣犳湁 <a href="<%=visitor.url%>followers/" target="_blank"><%=unread_followers%>浣嶆柊鍏虫敞鑰�</a>\n</li>\n<% } %>\n\n<% if(unread_favorites > 0) { %>\n<li class="unread-favorites">\n	浣犵殑鍥惧崥鍙堣鍠滄浜� <a href="<%=SERVER%>messages/interaction?tab=1" target="_blank"><%=unread_favorites%>娆�</a>\n</li>\n<% } %>\n\n<% if(unread_collections > 0) { %>\n<li class="unread-collections">\n	浣犵殑鍥惧崥鍙堣鏀惰棌浜哱n	<a href="<%=SERVER%>messages/interaction?tab=3" target="_blank"><%=unread_collections%>娆�</a>\n</li>\n<% } %>\n\n<%for(var i = 0,len = unreadMentions.length; i < len; i++) { %>\n<% var mention = unreadMentions[i]; %>\n<li class="unread-mentions">\n	<span class="author">\n		<%==Filter.sitesLinks(mention.authors)%>\n	</span>\n	<% if (mention.post) { %>\n	鍦� <a href="<%=mention.post.url%>" target="_blank"><%=mention.post.title%></a> 涓彁鍒颁綘\n	<% } else { %>\n	鎻愬埌浜嗕綘\n	<% } %>\n</li>\n<% } %>\n\n<%for(var i = 0,len = unreadComments.length; i < len; i++) { %>\n<% var comment = unreadComments[i]; %>\n<li class="unread-comments">\n	<span class="author">\n		<%==Filter.sitesLinks(comment.authors)%>\n	</span>\n	<% if (comment.post) { %>\n	鍦� <a href="<%=comment.post.url%>" target="_blank"><%=comment.post.title%></a> 涓瘎璁轰簡浣燶n	<% } else { %>\n	鍥炲浜嗕綘\n	<% } %>\n</li>\n<% } %>\n\n<%for(var i = 0,len = unreadNoteLikes.length; i < len; i++) { %>\n<% var like = unreadNoteLikes[i]; %>\n<li class="unread-comments">\n	<span class="author">\n		<%==Filter.sitesLinks(like.users)%>\n	</span>\n	<% if(like.post) { %>\n	璧炲悓浣犲湪 <a href="<%=like.post.url%>" target="_blank"><%=like.post.title%></a> 涓殑璇勮\n	<% } else { %>\n	璧炰簡浣燶n	<% } %>\n</li>\n<% } %>',
        e = "//tuchong.com/",
        n = Backbone.View.extend({
            render: _.template(t),
            $footer: $('<div class="notify-foot"><a class="notify-close">鍏抽棴</a><a class="notify-all" href="' + e + 'messages/interaction">鏌ョ湅鍏ㄩ儴</a></div>'),
            $wrapper: $('<ul class="notify-list"></ul>'),
            data: {
                unreadComments: [],
                unreadMentions: [],
                unreadNoteLikes: [],
                unread_messages: 0,
                unread_notifications: 0,
                unread_followers: 0,
                unread_favorites: 0,
                unread_collections: 0,
                visitor: null,
                SERVER: e
            },
            initialize: function(t) {
                this.data.visitor = t, this.$el = $('<div class="widget-notify"></div>').appendTo("body").append(this.$wrapper).append(this.$footer), this._WSNotification(), this._bindEvent(), this._initNotify()
            },
            _initNotify: function() {
                this.$wrapper.html(this.render(this.data)), this.$wrapper.find("li").length > 0 && this.$el.show(400)
            },
            _bindEvent: function() {
                var t = this;
                this.$el.find(".notify-close").on("click", function() {
                    t._clearData(), t.$el.hide()
                })
            },
            _mergeData: function(t) {
                var e = this.data;
                e.unreadComments = e.unreadComments.concat(t.unreadComments || []), e.unreadMentions = e.unreadMentions.concat(t.unreadMentions || []), e.unreadNoteLikes = e.unreadNoteLikes.concat(t.unreadNoteLikes || []), e.unread_favorites += parseInt(t.unread_favorites, 10) || 0, e.unread_collections += parseInt(t.unread_collections, 10) || 0, e.unread_followers += parseInt(t.unread_followers, 10) || 0, e.unread_notifications += parseInt(t.unread_notifications, 10) || 0, e.unread_messages += parseInt(t.unread_messages, 10) || 0, e.unread_recommend_weibo_users += parseInt(t.unread_recommend_weibo_users, 10) || 0
            },
            _clearData: function() {
                this.data.unreadMentions = [], this.data.unreadComments = [], this.data.unreadNoteLikes = [], this.data.unread_messages = 0, this.data.unread_notifications = 0, this.data.unread_favorites = 0, this.data.unread_collections = 0, this.data.unread_followers = 0
            },
            _WSNotification: function() {
                var t = this,
                    e = "wss://ws.tuchong.com";
                if (window.WebSocket) {
                    var n = new WebSocket(e);
                    n.onopen = function() {
                        n.send(JSON.stringify({
                            user: {
                                id: t.data.visitor.site_id
                            }
                        }))
                    }, n.onmessage = function(e) {
                        var n = $.parseJSON(e.data);
                        switch (n.type) {
                            case "browser":
                                t._mergeData(n), t._initNotify();
                                break;
                            case "desktop":
                                if (!window.Notification) return;
                                if ("denied" === Notification.permission) return;
                                if ("granted" !== Notification.permission) Notification.requestPermission().then(function(t) {
                                    if ("granted" === t) {
                                        var e = new Notification(n.title, n.options);
                                        e.onclick = function() {
                                            n.url && window.open(n.url, "_blank")
                                        };
                                        var i = setTimeout(function() {
                                            e.close(), clearTimeout(i)
                                        }, 1e4)
                                    }
                                });
                                else {
                                    var i = new Notification(n.title, n.options);
                                    i.onclick = function() {
                                        n.url && window.open(n.url, "_blank")
                                    };
                                    var o = setTimeout(function() {
                                        i.close(), clearTimeout(o)
                                    }, 1e4)
                                }
                        }
                    }
                }
            }
        });
    return n
}), define("header", ["notify"], function(t) {
    var e = "//tuchong.com/",
        n = window.TuchongApi,
        i = '<li data-count="<%=(notifications.unread_comments > 0 ? Filter.lessThan(notifications.unread_comments,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/interaction?tab=0">璇勮</a>\n</li>\n<li data-count="<%=(notifications.unread_favorites > 0 ? Filter.lessThan(notifications.unread_favorites,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/interaction?tab=1">鍠滄</a>\n</li>\n<li data-count="<%=(notifications.unread_note_likes > 0 ? Filter.lessThan(notifications.unread_note_likes,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/interaction?tab=2">璧炲悓</a>\n</li>\n<li data-count="<%=(notifications.unread_collections > 0 ? Filter.lessThan(notifications.unread_collections,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/interaction?tab=3">鏀惰棌</a>\n</li>\n<li class="subnav-separator three-words" data-count="<%=(notifications.unread_messages > 0 ? Filter.lessThan(notifications.unread_messages,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/system?tab=0">绔欏唴淇�</a>\n</li>\n<li data-count="<%=(notifications.unread_notifications > 0 ? Filter.lessThan(notifications.unread_notifications,100) : \'\')%>">\n    <a href="<%=SERVER%>messages/system?tab=1">閫氱煡</a>\n</li>\n<% if(notifications.unread_followers > 0) { %>\n<li class="subnav-separator four-words" data-count="<%=(notifications.unread_followers > 0 ? Filter.lessThan(notifications.unread_followers,100) : \'\')%>">\n    <a href="<%=visitor.url%>followers/">鏂板绮変笣</a>\n</li>\n<% } %>\n<% if(notifications.unread_recommend_weibo_users > 0) { %>\n<li class="four-words" data-count="<%=(notifications.unread_recommend_weibo_users > 0 ? Filter.lessThan(notifications.unread_recommend_weibo_users,100) : \'\')%>">\n    <a href="<%=SERVER%>lookup/weibo/">寰崥濂藉弸</a>\n</li>\n<% } %>',
        o = Backbone.View.extend({
            el: "header",
            notifications: {
                unread_comments: 0,
                unread_favorites: 0,
                unread_note_likes: 0,
                unread_collections: 0,
                unread_messages: 0,
                unread_notifications: 0,
                unread_followers: 0,
                unread_recommend_weibo_users: 0
            },
            renderMsg: _.template(i),
            events: {
                "click .J-search-btn": "_search",
                "click .logout-trigger": "_logout"
            },
            initialize: function() {
                this.$searchForm = this.$(".nav-search form"), this.$navMessages = this.$(".nav-messages"), this.$messagesList = this.$(".nav-messages .subnav-list"), window.isGuest || (this.notify = new t(window.visitor), /^\/messages\//.test(location.pathname) || this._ajaxNotification()), this._bindEvent()
            },
            _bindEvent: function() {
                var t = this,
                    e = this.$el.height(),
                    n = function() {
                        var n = $(window).scrollTop();
                        n > e ? t.$el.addClass("fixed-top") : t.$el.removeClass("fixed-top")
                    };
                this.$el.hasClass("need-fixed") && ($(window).on("scroll", n), n())
            },
            _search: function() {
                var t = this.$searchForm.find(".search-input"),
                    e = t.val().trim();
                return e ? void this.$searchForm.submit() : void t.focus()
            },
            _ajaxNotification: function() {
                var t = this;
                n.notifications.getAll(function(e) {
                    t._mergeNotifications(e.data.notifications || {})
                })
            },
            _mergeNotifications: function(t) {
                var n = this.notifications,
                    i = 0;
                for (var o in n) n[o] += t[o] || 0, i += n[o];
                var s = this.renderMsg({
                    notifications: n,
                    SERVER: e,
                    visitor: window.visitor
                });
                this.$messagesList.html(s), this.$navMessages.attr("data-count", i > 0 ? Filter.lessThan(i, 100) : "")
            },
            _logout: function() {
                n.accounts.logout(function() {
                    window.location.reload()
                })
            }
        });
    return o
}), define("dialog", function() {
    var t = '<div class="widget-dialog" id="<%=(id ? id : \'\')%>">\n	<div class="dialog-wrapper">\n		<% if(title) { %>\n		<h2 class="dialog-title"><%==title%></h2>\n		<% } %>\n		<div class="dialog-body"></div>\n		<a class="dialog-close icon-close" data-close="dialog" href="javascript:void(0)"></a>\n	</div>\n</div>',
        e = Backbone.View.extend({
            render: _.template(t),
            onShow: null,
            onClose: null,
            data: {
                title: "",
                id: ""
            },
            initialize: function(t, e) {
                this.$el = $(this.render(t)).appendTo("body"), e && this.$el.find(".dialog-wrapper").css(e)
            },
            events: {
                'click [data-close="dialog"]': "close"
            },
            _zIndex: 5,
            show: function(t) {
                t = t || {}, this.onClose = t.onClose || null, this.onShow = t.onShow || null, parseInt(t.zIndex, 10) > 5 && (this._zIndex = parseInt(t.zIndex, 10)), "function" == typeof this.onShow && this.onShow(), this.$el.css({
                    zIndex: this._zIndex
                }).show()
            },
            close: function() {
                "function" == typeof this.onClose && this.onClose(), this.$el.hide()
            },
            setTitle: function(t) {
                this.$el.find(".dialog-title").html(t)
            },
            setContent: function(t) {
                this.$el.find(".dialog-body").html(t)
            },
            hideClose: function() {
                this.$(".dialog-close").hide()
            },
            showClose: function() {
                this.$(".dialog-close").show()
            }
        });
    return e
}),
    function(t, e) {
        function n(t) {
            var e = new RSAKey;
            return e.setPublic(o, "10001"), e.encrypt(encodeURIComponent(t))
        }
        var i = "/rest/accounts/",
            o = "D8CC0180AFCC72C9F5981BDB90A27928672F1D6EA8A57AF44EFFA7DAF6EFB17DAD9F643B9F9F7A1F05ACC2FEA8DE19F023200EFEE9224104627F1E680CE8F025AF44824A45EA4DDC321672D2DEAA91DB27418CFDD776848F27A76E747D53966683EFB00F7485F3ECF68365F5C10C69969AE3D665162D2EE3A5BA109D7DF6C7A5";
        t.accounts = {
            login: function(t, o, s) {
                t.password = n(t.password), e.ajax({
                    url: i + "login",
                    type: "POST",
                    data: t,
                    success: function(t) {
                        "SUCCESS" == t.result ? o && o(t) : s && s(t)
                    },
                    error: function() {
                        s && s()
                    }
                })
            },
            logout: function(t, n) {
                e.ajax({
                    url: i + "logout",
                    type: "DELETE",
                    success: function(e) {
                        "SUCCESS" == e.result ? t && t(e) : n && n(e.message)
                    },
                    error: function() {
                        n && n("璇锋眰閿欒")
                    }
                })
            },
            register: function(t, o, s, a) {
                o.user_password && (o.user_password = n(o.user_password)), o.user_password2 && (o.user_password2 = n(o.user_password2)), e.ajax({
                    url: i + "register/" + t,
                    type: "POST",
                    data: o,
                    success: function(t) {
                        "SUCCESS" == t.result ? s && s(t) : a && a(t.message)
                    },
                    error: function() {
                        a && a("璇锋眰閿欒")
                    }
                })
            },
            checkName: function(t, n, o) {
                e.ajax({
                    url: i + "check-name/" + t,
                    type: "GET",
                    success: function(t) {
                        "SUCCESS" == t.result ? n && n(t) : o && o(t)
                    },
                    error: function() {
                        o && o()
                    }
                })
            },
            checkMobile: function(t, n, o, s) {
                e.ajax({
                    url: i + "check-mobile/" + t + "/" + n,
                    type: "GET",
                    success: function(t) {
                        "SUCCESS" == t.result ? o && o(t) : s && s(t)
                    },
                    error: function() {
                        s && s()
                    }
                })
            }
        }
    }(window.TuchongApi || (window.TuchongApi = {}), $),
    function(t, e) {
        var n = "/rest/captcha/";
        t.captcha = {
            get: function(t, i, o, s) {
                e.ajax({
                    url: n + t,
                    type: "POST",
                    data: i,
                    success: function(t) {
                        "SUCCESS" == t.result ? o && o(t) : s && s(t.message)
                    },
                    error: function() {
                        s && s("璇锋眰閿欒")
                    }
                })
            },
            verify: function(t, i, o) {
                e.ajax({
                    url: n + "verify",
                    type: "POST",
                    data: t,
                    success: function(t) {
                        "SUCCESS" == t.result ? i && i(t) : o && o(t.message)
                    },
                    error: function() {
                        o && o("璇锋眰閿欒")
                    }
                })
            }
        }
    }(window.TuchongApi || (window.TuchongApi = {}), $), define("loginForm", [], function() {
    "use strict";
    var t = window.TuchongApi,
        e = Backbone.View.extend({
            el: "#login-dialog .login-form",
            _needCaptcha: !1,
            events: {
                submit: "_login",
                "click .captcha-img": "_getCaptcha",
                "click .switch-type": "_switchType"
            },
            initialize: function(t) {
                this._showError = t._showError, this._freeze = t._freeze, this._unfreeze = t._unfreeze, this.$captcha = this.$(".login-captcha"), this.$captchaImg = this.$(".captcha-img"), this.$captchaInput = this.$('input[name="captcha_token"]')
            },
            _switchType: function() {
                this.trigger("switchType", "register")
            },
            _getCaptcha: function() {
                var e = this;
                t.captcha.get("image", null, function(t) {
                    e.$captcha.show(), e.$captchaImg.attr("src", t.captchaBase64).end(), e.$captchaInput.data("captchaid", t.captchaId)
                }, function(t) {
                    e._showError(e.$el, t || "鑾峰彇楠岃瘉鐮佸嚭閿�")
                })
            },
            _login: function(e) {
                e.preventDefault();
                var n = this,
                    i = this.$el,
                    o = {
                        account: i.find('input[name="account"]').val(),
                        password: i.find('input[name="password"]').val(),
                        remember: "on"
                    };
                n._needCaptcha && (o.captcha_id = n.$captchaInput.data("captchaid"), o.captcha_token = n.$captchaInput.val()), n._freeze(i), i.find(".login-msg").text(""), t.accounts.login(o, function() {
                    n._unfreeze(i), n.trigger("close"), window.location.reload()
                }, function(t) {
                    switch (n._unfreeze(i), t.result) {
                        case "ERROR":
                            switch (t.code) {
                                case 11:
                                case 12:
                                    n.$captcha.show(), n._getCaptcha(), n._needCaptcha = !0, n._showError(i, t.message || "璇疯緭鍏ラ獙璇佺爜");
                                    break;
                                default:
                                    n._showError(i, t.message || "鐧诲綍鍑洪敊")
                            }
                            break;
                        case "INVALID":
                            n._showError(i, t.message || "璐﹀彿鎴栧瘑鐮佷笉鍚堟硶锛�");
                            break;
                        default:
                            n._showError(i, t.message || "鐧诲綍鍑洪敊")
                    }
                })
            }
        });
    return e
}),
    function(t, e) {
        function n(t) {
            var e = new RSAKey;
            return e.setPublic(o, "10001"), e.encrypt(encodeURIComponent(t))
        }
        var i = "/rest/2/accounts/",
            o = "D8CC0180AFCC72C9F5981BDB90A27928672F1D6EA8A57AF44EFFA7DAF6EFB17DAD9F643B9F9F7A1F05ACC2FEA8DE19F023200EFEE9224104627F1E680CE8F025AF44824A45EA4DDC321672D2DEAA91DB27418CFDD776848F27A76E747D53966683EFB00F7485F3ECF68365F5C10C69969AE3D665162D2EE3A5BA109D7DF6C7A5";
        t.accounts2 = {
            register: function(t, o, s) {
                t.user_password && (t.user_password = n(t.user_password)), t.user_password2 && (t.user_password2 = n(t.user_password2)), e.ajax({
                    url: i + "register",
                    type: "POST",
                    data: t,
                    success: function(t) {
                        "SUCCESS" == t.result ? o && o(t) : s && s(t.message)
                    },
                    error: function() {
                        s && s("璇锋眰閿欒")
                    }
                })
            }
        }
    }(window.TuchongApi || (window.TuchongApi = {}), $), ! function(t, e) {
    t.toutiaoLog = {
        post: function(t, n, i, o, s) {
            e.ajax({
                url: "/rest/log-toutiao",
                type: "POST",
                data: {
                    event_name: t,
                    event_time: n,
                    params: i
                },
                success: function(t) {
                    "SUCCESS" == t.result ? o && o(t) : s && s(t.message)
                },
                error: function() {
                    s && s("璇锋眰閿欒")
                }
            })
        }
    }
}(window.TuchongApi || (window.TuchongApi = {}), $),
    function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.jQuery,
            e = window,
            n = e.TuchongApi.toutiaoLog;
        t.toutiaoLogUpload = {
            interactive_like: function(t) {
                return t = _.extend({}, {
                    rem_type: "",
                    like_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("interactive_like", t.like_time, JSON.stringify([t]))
            },
            interactive_comment: function(t) {
                return t = _.extend({}, {
                    rem_type: "",
                    comment_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("interactive_comment", t.comment_time, JSON.stringify([t]))
            },
            share_action: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("share_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            follow: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("follow", Date.now() / 1e3, JSON.stringify([t]))
            },
            subscription: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("subscription", Date.now() / 1e3, JSON.stringify([t]))
            },
            start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("start_page", t.enter_time, JSON.stringify([t]))
            },
            pinterest: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("pinterest", Date.now() / 1e3, JSON.stringify([t]))
            },
            reg: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("reg", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_reward: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("click_reward", Date.now() / 1e3, JSON.stringify([t]))
            },
            vote: function(t) {
                return t = _.extend({}, {
                    platform: "pc"
                }, t), n.post("vote_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            vote_start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("vote_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_banners: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("click_banners", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_btn: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("click_btn", Date.now() / 1e3, JSON.stringify([t]))
            },
            phpoto_detail_start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("right_button_action", Date.now() / 1e3, JSON.stringify([t]))
            }
        }
    }(), define("registerForm", [], function() {
    "use strict";
    var t = window.TuchongApi,
        e = Backbone.View.extend({
            el: "#login-dialog .register-form",
            _phoneReg: /^1(3|4|5|7|8)\d{9}$/,
            _phoneInvalid: !0,
            _smsSended: !1,
            _disabedSms: !1,
            _minPasswordLen: 6,
            _zoon: "0086",
            events: {
                submit: "_register",
                "click .captcha-img": "_getCaptcha",
                "blur .J-mobile-input": "_checkValid",
                "click .J-send-captcha": "_sendSmsCaptcha",
                "click .switch-type": "_switchType"
            },
            initialize: function(t) {
                this._freeze = t._freeze, this._unfreeze = t._unfreeze, this._showError = t._showError, this.$captcha = this.$(".register-captcha"), this.$captchaImg = this.$(".captcha-img"), this.$captchaInput = this.$('input[name="captcha_token"]'), this._getCaptcha()
            },
            _switchType: function() {
                this.trigger("switchType", "login")
            },
            _checkValid: function(t) {
                var e = $(t.currentTarget),
                    n = e.val().trim();
                this._phoneReg.test(n) ? this._checkMobile(n, e) : (e.siblings(".warning").text("璇疯緭鍏ユ纭殑鎵嬫満鍙风爜").show(), this._phoneInvalid = !0)
            },
            _checkMobile: function(e, n) {
                var i = this;
                t.accounts.checkMobile(i._zoon, e, function() {
                    n.siblings(".warning").hide(), i._phoneInvalid = !1
                }, function(t) {
                    i._phoneInvalid = !0, t ? n.siblings(".warning").text(t.message || "璇疯緭鍏ユ纭殑鎵嬫満鍙风爜").show() : i._showError(i.$el, "缃戠粶閿欒锛岃绋嶅悗閲嶈瘯")
                })
            },
            _getCaptcha: function() {
                var e = this;
                t.captcha.get("image", null, function(t) {
                    e.$captcha.show(), e.$captchaImg.attr("src", t.captchaBase64).end(), e.$captchaInput.data("captchaid", t.captchaId)
                }, function(t) {
                    e._showError(e.$el, t || "鑾峰彇楠岃瘉鐮佸嚭閿�")
                })
            },
            _sendSmsCaptcha: function(e) {
                if (!this._disabedSms && !this._loading) {
                    var n = this,
                        i = $(e.currentTarget),
                        o = n.$el,
                        s = n.$captchaInput,
                        a = n.$("input[name=mobile_number]");
                    if (n._phoneInvalid) return void a.focus().siblings(".warning").show();
                    if (!s.val().trim()) return void n._showError(o, "璇疯緭鍏ラ獙璇佺爜");
                    var r = {
                        zone: n._zoon,
                        mobile_number: a.val().trim(),
                        captcha_id: s.data("captchaid"),
                        captcha_token: s.val().trim()
                    };
                    n._smsSended = !0, n._loading = !0, t.captcha.get("sms", r, function(t) {
                        return n._loading = !1, "SUCCESS" === t.result ? (i.attr("disabled", !0), void n._countDown(12e4, 1e3, function(t) {
                            i.text("杩樺墿" + t / 1e3 + "绉掑彲浠ラ噸鍙�"), n._disabedSms = !0
                        }, function() {
                            n._disabedSms = !1, i.text("鑾峰彇楠岃瘉鐮�")
                        })) : void 0
                    }, function(t) {
                        n._loading = !1, n._disabedSms = !1, i.text("鑾峰彇楠岃瘉鐮�"), n._showError(o, t || "鍙戦€侀獙璇佺爜澶辫触")
                    })
                }
            },
            _countDown: function(t, e, n, i) {
                var o = t,
                    s = setInterval(function() {
                        return o >= 0 ? (n(o), void(o -= e)) : (clearInterval(s), void i())
                    }, e)
            },
            _register: function(e) {
                e.preventDefault();
                var n = this,
                    i = n.$el;
                if (!n._phoneInvalid && n._smsSended) {
                    var o = {
                        nonce: window.nonce || "",
                        zone: n._zoon,
                        mobile_number: n.$('input[name="mobile_number"]').val().trim(),
                        sms_captcha: n.$('input[name="sms_captcha"]').val().trim(),
                        user_password: n.$('input[name="user_password"]').val().trim()
                    };
                    n._freeze(i), i.find(".login-msg").text(""), t.accounts2.register(o, function(t) {
                        n._unfreeze(i), n.trigger("switchType", "user", {
                            site: t.data.site,
                            nonce: o.nonce
                        }), $.toutiaoLogUpload.reg({
                            platform: "phone"
                        })
                    }, function(t) {
                        n._unfreeze(i), n._showError(i, t || "缃戠粶閿欒锛岃绋嶅悗閲嶈瘯")
                    })
                }
            }
        });
    return e
}), $.fn.fileSubmit = function(t) {
    t = $.extend({
        success: $.noop,
        error: $.noop,
        complete: $.noop,
        uploadProgress: $.noop
    }, t);
    var e, n = this[0];
    if ("undefined" == typeof XMLHttpRequest || "undefined" == typeof FormData || void 0 === (e = new XMLHttpRequest).upload) {
        var i = "hidden-iframe-" + Math.round(1e6 * Math.random());
        this.attr("target", i);
        var o = $('<iframe name="' + i + '" style="display:none;"></iframe>').insertAfter(this);
        n.submit(), o.load(function(e) {
            t.complete(e);
            var n = (this.contentWindow || this.contentDocument).document;
            if (n.title) {
                var i = {
                    "413 Request Entity Too Large": "鏂囦欢灏哄杩囧ぇ",
                    "502 Bad Gateway": "鏈嶅姟鍣ㄥ唴閮ㄩ敊璇紝璇烽€氱煡绠＄悊鍛�"
                };
                alert(i[n.title] || n.title)
            }
        })
    } else {
        var s = new FormData;
        $.each(this.serializeArray(), function(t, e) {
            s.append(e.name, e.value)
        }), this.find("input[type=file]").each(function(t, e) {
            var n = $(e);
            s.append(n.attr("name"), e.files[0])
        }), e.addEventListener("error", function() {
            alert("杩炴帴涓嶅埌鏈嶅姟鍣紝璇锋鏌ヤ綘鐨勭綉缁滆繛鎺�")
        }, !1), e.addEventListener("readystatechange", function() {
            if (4 == e.readyState) {
                e.onreadystatechange = null;
                var n, i = !1;
                if (e.status >= 200 && e.status < 300 || 304 == e.status || 0 == e.status && "file:" == protocol) {
                    e.getResponseHeader("content-type"), n = e.responseText;
                    try {
                        n = $.parseJSON(n)
                    } catch (o) {
                        i = o
                    }
                    i ? t.error(i) : t.success(n)
                } else t.error(e.statusText)
            }
        }, !1), $.each(["abort", "loadstart", "loadend", "progress", "timeout"], function() {
            t[this] && e.addEventListener(this, t[this], !1)
        }), e.upload.addEventListener("progress", t.uploadProgress, !1), e.open(this.attr("method").toUpperCase(), n.action, !0), e.setRequestHeader("Cache-Control", "no-cache"), e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.send(s)
    }
},
    function(t, e) {
        var n = "/rest/users/self/logo-and-name";
        t.userName = {
            patch: function(t, i, o) {
                e.ajax({
                    url: n,
                    type: "patch",
                    data: t,
                    success: function(t) {
                        "SUCCESS" == t.result ? i && i(t) : o && o(t.message)
                    },
                    error: function() {
                        o && o("璇锋眰閿欒")
                    }
                })
            }
        }
    }(window.TuchongApi || (window.TuchongApi = {}), $), define("userSetForm", [], function() {
    "use strict";
    var t = window.TuchongApi,
        e = Backbone.View.extend({
            el: "#login-dialog .user-content",
            _maxNameLen: 20,
            _nameInvalid: !1,
            _logoSrc: "",
            events: {
                "change .J-logo-file": "_fileChange",
                'blur [name="user_name"]': "_blur",
                "click .submit-btn": "_submit"
            },
            initialize: function(t) {
                this._showError = t._showError || $.noop, this.$logoForm = this.$(".J-logoForm"), this.$logoInput = this.$(".J-logo-file"), this.$nameInput = this.$('input[name="user_name"]'), this.$submit = this.$(".submit-btn")
            },
            initData: function(t) {
                this.$logoForm.attr("action", "/rest/sites/" + t.site.site_id + "/logo").find('input[name="nonce"]').val(t.nonce).end().find('input[name="site_id"]').val(t.site.site_id), this._nonce = t.nonce
            },
            _blur: function(t) {
                var e = $(t.currentTarget),
                    n = e.val().trim();
                !n || this._isOverLen(n) ? (e.siblings(".warning").text("鏄电О涓嶈兘涓虹┖锛屼笖涓嶈兘瓒呰繃10涓眽瀛楁垨20涓嫳鏂囧瓧绗�").show(), this.$submit.attr("disabled", !0), this._nameInvalid = !0) : this._checkName(n, e)
            },
            _isOverLen: function(t) {
                for (var e = !1, n = 0, i = 0; i < t.length; i++) t.charCodeAt(i) > 127 ? n += 2 : n++;
                return n > this._maxNameLen && (e = !0), e
            },
            _checkName: function(e, n) {
                var i = this;
                t.accounts.checkName(e, function() {
                    n.siblings(".warning").hide(), i.$submit.attr("disabled", !1), i._nameInvalid = !1
                }, function(t) {
                    i._nameInvalid = !0, t ? (n.siblings(".warning").text(t.message || "鏄电О涓嶈兘涓虹┖锛屼笖涓嶈兘瓒呰繃10涓眽瀛楁垨20涓嫳鏂囧瓧绗�").show(), i.$submit.attr("disabled", !0)) : i._showError(i.$el, "缃戠粶閿欒锛岃绋嶅悗閲嶈瘯")
                })
            },
            _fileChange: function(t) {
                var e = t.target,
                    n = e.files[0];
                n && this._isImage(e) && this._fileUpload()
            },
            _fileUpload: function() {
                var t = this,
                    e = t.$logoForm.find(".logo-label"),
                    n = e.find(".logo-tips"),
                    i = e.find(".logo-img");
                t.$logoForm.fileSubmit({
                    success: function(o) {
                        t.$logoInput.val(""), "SUCCESS" === o.result ? (t._logoSrc = o.site.logo.middle, e.addClass("loaded"), i.attr("src", t._logoSrc), n.text("鏇存敼澶村儚")) : (n.text(t._logoSrc ? "鏇存敼澶村儚" : "璁剧疆澶村儚"), t._showError(t.$el, o.message || "鎶ラ敊锛岃绋嶅悗閲嶈瘯"))
                    },
                    error: function(e) {
                        t.$logoInput.val(""), n.text(t._logoSrc ? "鏇存敼澶村儚" : "璁剧疆澶村儚"), t._showError(t.$el, e || "鎶ラ敊鍟�")
                    },
                    uploadProgress: function() {
                        n.text("涓婁紶涓�...")
                    }
                })
            },
            _isImage: function(t) {
                if (!/\.(gif|jpeg|jpg|png)$/i.test(t.value)) return alert("璇烽€夋嫨JPG/PNG/GIF绫诲瀷鐨勫浘鐗�"), !1;
                if (t.files) {
                    var e = t.files[0];
                    if (e.type && !/^image\/(gif|jpeg|png)$/i.test(e.type)) return alert("璇烽€夋嫨JPG/PNG/GIF绫诲瀷鐨勫浘鐗�"), !1;
                    if (t.form.MAX_FILE_SIZE && e.size && e.size > t.form.MAX_FILE_SIZE.value) return alert("鏂囦欢灏哄涓嶈兘澶т簬" + formatUnit(t.form.MAX_FILE_SIZE.value)), !1
                }
                return !0
            },
            _submit: function(e) {
                var n = this,
                    i = ($(e.currentTarget), n.$nameInput.val().trim()),
                    o = {
                        name: i,
                        nonce: n._nonce
                    };
                t.userName.patch(o, function() {
                    window.location.reload()
                }, function(t) {
                    n._showError(n.$el, t || "缃戠粶閿欒锛岃绋嶅悗閲嶈瘯")
                })
            }
        });
    return e
}), define("login", ["dialog", "loginForm", "registerForm", "userSetForm"], function(t, e, n, i) {
    var o = '<div class="login-dialog-content login">\n	<div class="group login">\n		<form class="dialog-form login-form" action="/rest/accounts/login" method="post">\n			<div class="dialog-title">\n				<h3 class="fl"> 鐧诲綍 </h3>\n				<span class="login-tips fr">\n					杩樻病鏈夎处鍙凤紝\n					<a href="javascript:;" class="switch-type"  data-type="login"> 绔嬪嵆娉ㄥ唽 </a>\n				</span>\n			</div>\n\n			<div class="form-group">\n				<input type="text" name="account" autofocus required placeholder="鎵嬫満鍙穃\閭\\鐢ㄦ埛鍚�">\n			</div>\n\n			<div class="form-group">\n				<input type="password" name="password" required="" placeholder="杈撳叆瀵嗙爜">\n				<a href="//tuchong.com/account/forget/" target="_blank" class="input-tips forget-password">蹇樿瀵嗙爜锛�</a>\n			</div>\n\n			<div class="form-group login-captcha">\n				<input type="text" name="captcha_token" data-captchaid="" placeholder="楠岃瘉鐮�">\n				<img class="captcha-img input-tips" src="">\n			</div>\n\n			<div class="form-group form-msg">\n			</div>\n\n			<div class="form-group text-center">\n				<button class="submit-btn" href="javascript:;" type="submit">\n					鐧诲綍\n				</button>\n			</div>\n\n			<div class="login-connect">\n				<a href="//tuchong.com/qq/auth/" class="login-qq"></a>\n				<a href="//tuchong.com/weixin/auth/" class="login-weixin"></a>\n				<a href="//tuchong.com/weibo/auth/" class="login-weibo"></a>\n			</div>\n		</form>\n	</div>\n\n	<div class="group register">\n		<form class="dialog-form register-form" action="/rest/accounts/login" method="post">\n			<div class="dialog-title">\n				<h3 class="fl"> 娉ㄥ唽鍥捐櫕 </h3>\n				<span class="login-tips fr">\n					宸叉湁璐﹀彿锛孿n					<a href="javascript:;" class="switch-type" data-type="register"> 绔嬪嵆鐧诲綍 </a>\n				</span>\n			</div>\n\n			<div class="form-group">\n				<input type="text" name="mobile_number" class="J-mobile-input"\n					data-invalid=true required placeholder="鎵嬫満鍙风爜">\n				<span class="input-tips warning">\n					璇疯緭鍏ユ纭殑鎵嬫満鍙风爜\n				</span>\n			</div>\n\n			<div class="form-group register-captcha">\n				<input type="text" name="captcha_token" data-captchaid="" placeholder="楠岃瘉鐮�">\n				<img class="captcha-img input-tips" src="">\n			</div>\n\n			<div class="form-group">\n				<input type="text" name="sms_captcha" required placeholder="鎵嬫満楠岃瘉鐮�">\n				<a href="javascript:;" class="input-tips sms-captcha J-send-captcha">\n					鑾峰彇楠岃瘉鐮乗n				</a>\n			</div>\n\n			<div class="form-group">\n				<input type="password" name="user_password" required placeholder="瀵嗙爜6-16浣嶏紝鍖哄垎澶у皬鍐�">\n				<span class="input-tips warning">\n					璐﹀彿鎴栬€呭瘑鐮侀敊璇痋n				</span>\n			</div>\n			\n			<div class="form-group form-msg">\n			</div>\n\n			<div class="login-line">\n				<button class="submit-btn" href="javascript:;" type="submit">\n					娉ㄥ唽\n				</button>\n			</div>\n\n			<div class="login-connect">\n				<a href="//tuchong.com/qq/auth/" class="login-qq"></a>\n				<a href="//tuchong.com/weixin/auth/" class="login-weixin"></a>\n				<a href="//tuchong.com/weibo/auth/" class="login-weibo"></a>\n			</div>\n\n			<div class="register-tips">\n				銆屾敞鍐屻€嶅嵆浠ｈ〃浣犲凡缁忚鐪熼槄璇诲苟鍚屾剰鎺ュ彈 \n				<a href="//tuchong.com/info/terms/" target="_blank">鐢ㄦ埛鍗忚</a>\n			</div>\n		</form>\n	</div>\n\n	<div class="group user">\n		<div class="dialog-form user-content">\n			<div class="dialog-title">\n				<h3 class="fl"> Hi,娆㈣繋鍔犲叆鍥捐櫕 </h3>\n			</div>\n\n			<div class="form-group">\n				<form class="J-logoForm logo-form text-center" method="patch" enctype="multipart/form-data" action="">\n					<input type="hidden" name="nonce" value="">		\n					<input type="hidden" name="site_id" value="">\n					<input type="hidden" name="MAX_FILE_SIZE" value="4194304">\n					<label class="logo-label">\n						<img class="logo-img" src=""/>\n						<span href="javascript:;" class="logo-tips">\n							璁剧疆澶村儚\n						</span>\n						<input name="logo" accept="image/*" type="file" class="logo-file J-logo-file"/>\n					</label>\n				</form>\n			</div>\n\n			<div class="form-group">\n				<input type="text" name="user_name" required placeholder="杈撳叆鏄电О, 涓嶈秴杩�10涓眽瀛楁垨20涓嫳鏂囧瓧绗�">\n				<p class="warning">\n					鏄电О涓嶈兘涓虹┖锛屼笖涓嶈兘瓒呰繃10涓眽瀛楁垨20涓嫳鏂囧瓧绗n				</p>\n			</div>\n\n			<div class="form-group form-msg">\n			</div>\n\n			<div class="login-line">\n				<button class="submit-btn" href="javascript:;" type="submit" disabled>\n					瀹屾垚\n				</button>\n			</div>\n		</div>\n	</div>\n</div>\n',
        s = (window.TuchongApi, Backbone.View.extend({
            el: "#login-dialog",
            _isInitial: !1,
            render: _.template(o),
            dialog: new t({
                title: "",
                id: "login-dialog"
            }, {
                width: "420px"
            }),
            initialize: function() {
                this._bindEvt()
            },
            _close: function() {
                this.dialog.close()
            },
            _init: function() {
                this.dialog.setContent(this.render()), this.loginForm = new e({
                    _freeze: this._freeze,
                    _unfreeze: this._unfreeze,
                    _showError: this._showError
                }), this.registerForm = new n({
                    _freeze: this._freeze,
                    _unfreeze: this._unfreeze,
                    _showError: this._showError
                }), this.userSetForm = new i({
                    _showError: this._showError
                }), this.$dialogWrapper = $("#login-dialog .dialog-wrapper"), this.$dialogContent = this.$(".login-dialog-content"), this.$loginForm = this.$(".login-form"), this.$registerForm = this.$(".register-form"), this.loginForm.on("close", this._close.bind(this)), this.loginForm.on("switchType", this._switchType.bind(this)), this.registerForm.on("switchType", this._switchType.bind(this))
            },
            _show: function(t) {
                this._isInitial || (this._init(), this._isInitial = !0), this.dialog.show(t)
            },
            _switchType: function(t, e) {
                this.$dialogContent.removeClass("login register user").addClass(t), "register" === t ? this.$dialogWrapper.css("padding-bottom", "20px") : this.$dialogWrapper.css("padding-bottom", "40px"), "user" === t && (this.userSetForm.initData(e), this.dialog.hideClose())
            },
            _showError: function(t, e) {
                t.find(".form-msg").text(e || "鐧诲綍鍑洪敊")
            },
            _freeze: function(t) {
                t.find("button[type=submit]").attr("disabled", !0)
            },
            _unfreeze: function(t) {
                t.find("button[type=submit]").attr("disabled", !1)
            },
            _bindEvt: function() {
                var t = this;
                $(document).on("click", ".login-trigger", function() {
                    t._show(), t._switchType("login")
                }).on("click", ".register-trigger", function() {
                    t._show(), t._switchType("register")
                }).on("login", function(e) {
                    t._show(e), t._switchType("login")
                })
            }
        })),
        a = null;
    return function() {
        return null === a && (a = new s), a
    }
}), define("gotop", function() {
    var t = Backbone.View.extend({
        initialize: function() {
            var t = this;
            this.$el = $('<a class="icon-gotop"></a>').appendTo("body"), $(window).on("scroll", function() {
                var e = $(window).scrollTop();
                500 > e ? t.$el.hide() : t.$el.show()
            }), this.$el.on("click", function() {
                $("html,body").animate({
                    scrollTop: 0
                })
            })
        }
    });
    return t
}), define("footer", function() {
    var t = Backbone.View.extend({
        el: "footer",
        events: {
            "click .switch-layout": "_swicthLayout",
            "click .app-link": "_download"
        },
        initialize: function() {},
        _swicthLayout: function(t) {
            var e = $(t.target).data("version");
            this._setCookie("version", e, 14, "/"), window.location.reload()
        },
        _download: function(t) {
            $.ajax({
                url: "/rest/kplb",
                type: "POST",
                data: {
                    platform: $(this).data("type"),
                    referer: $(this).data("referer")
                },
                success: function() {},
                error: function() {}
            }), "" == $(this).attr("href") && (t.preventDefault(), alert($(this).data("type") + "鐗堟湰绋嶅悗鎺ㄥ嚭锛屾暚璇风暀鎰�"))
        },
        _setCookie: function(t, e, n, i, o, s) {
            if ("number" == typeof n) {
                var a = n,
                    r = n = new Date;
                r.setTime(+r + 864e5 * a)
            }
            document.cookie = [t, "=", escape(e), n ? "; expires=" + n.toUTCString() : "", i ? "; path=" + i : "", o ? "; domain=" + o : "", s ? "; secure" : ""].join("")
        }
    });
    return t
}),
    function(t) {
        function e(e, n, i, o, s) {
            return t.each(e, function(t, e) {
                e.computedHeight = i, e.computedWidth = Math.round(n / s * e.ratio), e.marginLeft = 0 == t ? 0 : o, s -= e.ratio, n -= e.computedWidth
            }), e
        }
        t.generateRows = t.justifyPosts = function(n, i, o, s, a, r) {
            o || (o = 20), s || (s = 120), r || (r = 240);
            var c, l = [],
                u = [],
                d = 0,
                p = i.length,
                f = 0,
                h = 0;
            return c = a ? function(t, e) {
                return t / e
            } : function(t, e) {
                return Math.max(Math.min(t / e, 4 / 3), .75)
            }, t.each(i, function(t, i) {
                var a = i.width || 200,
                    g = i.height || 300;
                i.ratio = c(a, g), u.push(i);
                var m = u.length;
                d += i.ratio;
                var _ = n - (m - 1) * o,
                    w = Math.round(_ / d);
                if (s > w || m > 5) {
                    var v = u.pop();
                    _ = n - (u.length - 1) * o, d -= v.ratio, l.push({
                        items: e(u, _, f, o, d),
                        rowHeight: f,
                        complete: !0
                    }), f > h && (h = f), u = [v], m = 1, d = v.ratio, _ = n, w = Math.round(_ / d)
                }
                if (f = w, t == p - 1) {
                    var b = !0;
                    w > r && 4 >= m && (b = !1, w = Math.round(.6 * r + .4 * s), _ = Math.round(w * d)), l.push({
                        items: e(u, _, w, o, d),
                        rowHeight: w,
                        complete: b
                    })
                }
            }), l
        }
    }($),
    function(t) {
        function e(e) {
            var i = t(window).scrollTop(),
                o = e.find(".lazy-load");
            t.each(o, function(e, o) {
                var s = t(o);
                s.offset().top < n + i && "none" != s.css("display") && ("image" == s.data("lazy-type") ? s.attr("src", s.data("lazy-url")) : s.css({
                    backgroundImage: "url(" + s.data("lazy-url") + ")"
                }), s.removeClass("lazy-load"))
            })
        }
        var n = window.innerHeight;
        t.fn.lazyload = function(n) {
            var i = this;
            i.each(function(i, o) {
                var s = t(o),
                    a = s.data("lazyload");
                a || (s.data("lazyload", !0), n || t(window).on("scroll", function() {
                    e(s)
                })), e(s)
            })
        }
    }($), ! function(t, e) {
    t.toutiaoLog = {
        post: function(t, n, i, o, s) {
            e.ajax({
                url: "/rest/log-toutiao",
                type: "POST",
                data: {
                    event_name: t,
                    event_time: n,
                    params: i
                },
                success: function(t) {
                    "SUCCESS" == t.result ? o && o(t) : s && s(t.message)
                },
                error: function() {
                    s && s("璇锋眰閿欒")
                }
            })
        }
    }
}(window.TuchongApi || (window.TuchongApi = {}), $),
    function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.jQuery,
            e = window,
            n = e.TuchongApi.toutiaoLog;
        t.toutiaoLogUpload = {
            interactive_like: function(t) {
                return t = _.extend({}, {
                    rem_type: "",
                    like_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("interactive_like", t.like_time, JSON.stringify([t]))
            },
            interactive_comment: function(t) {
                return t = _.extend({}, {
                    rem_type: "",
                    comment_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("interactive_comment", t.comment_time, JSON.stringify([t]))
            },
            share_action: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("share_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            follow: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("follow", Date.now() / 1e3, JSON.stringify([t]))
            },
            subscription: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("subscription", Date.now() / 1e3, JSON.stringify([t]))
            },
            start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    operation: "pc"
                }, t), n.post("start_page", t.enter_time, JSON.stringify([t]))
            },
            pinterest: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("pinterest", Date.now() / 1e3, JSON.stringify([t]))
            },
            reg: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("reg", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_reward: function(t) {
                return t = _.extend({}, {
                    operation: "pc"
                }, t), n.post("click_reward", Date.now() / 1e3, JSON.stringify([t]))
            },
            vote: function(t) {
                return t = _.extend({}, {
                    platform: "pc"
                }, t), n.post("vote_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            vote_start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("vote_action", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_banners: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("click_banners", Date.now() / 1e3, JSON.stringify([t]))
            },
            click_btn: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("click_btn", Date.now() / 1e3, JSON.stringify([t]))
            },
            phpoto_detail_start_page: function(t) {
                return t = _.extend({}, {
                    enter_time: Date.now() / 1e3,
                    platform: "pc"
                }, t), n.post("right_button_action", Date.now() / 1e3, JSON.stringify([t]))
            }
        }
    }(), define("main", ["gotop", "login"], function(t, e) {
    var n = '<!-- 涓嶈緭鍑烘渶鍚庝竴琛� -->\n<% for(var i =0,len = rows.length; i < len; i++) { %>\n<% if(rows[i].complete) { %>\n<li class="post-row" style="height: <%=rows[i].rowHeight%>px;">\n    <% var posts = rows[i].items; %>\n    <% for(var j = 0, plen = posts.length; j < plen; j++) { %>\n    <a class="post-cover lazy-load" data-lazy-url="<%=posts[j].cover_url%>" style="width: <%=posts[j].computedWidth%>px;height: <%=posts[j].computedHeight%>px;margin-left: <%=posts[j].marginLeft%>;" href="<%=posts[j].url%>" target="_blank">\n        <div class="post-mask">\n            <h3 class="post-title"><%-posts[j].title%></h3>\n            <img class="post-author-icon" src="<%=posts[j].author.icon%>">\n            <span class="post-author-name"><%-posts[j].author.name%></span>\n        </div>\n    </a>\n    <% } %>\n</li>\n<% } %>\n<% } %>',
        i = Backbone.View.extend({
            el: "main",
            renderPost: _.template(n),
            initialize: function() {
                this.gotop = new t, this.login = new e, $("body").addClass("body-loaded"), this.$postList = this.$el.find(".posts-list");
                var n = $.justifyPosts(this.$postList.width(), window.hotPosts, 10, 250);
                this.$postList.html(this.renderPost({
                    rows: n
                })), this._bindEvent()
            },
            _bindEvent: function() {
                var t = this;
                $(document).lazyload(), this.$postList.on("mouseenter", ".post-cover", function(t) {
                    var e = $(this),
                        n = e.find(".post-mask"),
                        i = e.width(),
                        o = e.height();
                    n.removeClass("leave-left leave-top leave-bottom leave-right"), n.addClass(t.offsetY / t.offsetX <= o / i ? i - t.offsetX >= t.offsetY - 0 ? "enter-top" : "enter-right" : o - t.offsetY >= t.offsetX - 0 ? "enter-left" : "enter-bottom")
                }).on("mouseleave", ".post-mask", function(t) {
                    var e = $(this),
                        n = e.width(),
                        i = e.height();
                    e.removeClass("enter-left enter-top enter-bottom enter-right"), t.offsetX < 0 ? e.addClass("leave-left") : t.offsetX > n ? e.addClass("leave-right") : t.offsetY < 0 ? e.addClass("leave-top") : t.offsetY > i && e.addClass("leave-bottom")
                }), $("header").find(".login-trigger").on("click", function() {
                    $.toutiaoLogUpload.welcomeLogin({
                        position: "btn_login",
                        current_page: "pc_home_logout"
                    })
                }), $("header").find(".register-trigger").on("click", function() {
                    $.toutiaoLogUpload.welcomeReg({
                        position_str: "btn_reg",
                        current_page: "pc_home_logout"
                    })
                }), this.$el.find(".cover-enter").on("click", function() {
                    $.toutiaoLogUpload.welcomeReg({
                        position_str: "btn_join_now",
                        current_page: "pc_home_logout"
                    })
                }), this.$el.find(".tuchong_stock_search_input").keyup(function(t) {
                    if (13 === t.keyCode) {
                        var e = $(t.target).val() || "椋庢櫙";
                        window.open("http://stock.tuchong.com/search?source=tc_pc_home_search&term=" + e), ga("send", "event", {
                            eventCategory: "guidance",
                            eventAction: "tuchong_creative_search",
                            eventLabel: e
                        })
                    }
                }), this.$el.find(".tuchong_stock_search_btn").on("click", function() {
                    var e = t.$el.find(".tuchong_stock_search_input").val() || "椋庢櫙";
                    window.open("http://stock.tuchong.com/search?source=tc_pc_home_search&term=" + e), ga("send", "event", {
                        eventCategory: "guidance",
                        eventAction: "tuchong_creative_search",
                        eventLabel: e
                    })
                }), this.$el.find(".tuchong_stock_search_input").blur(function() {
                    t.$el.find(".search-input").css("opacity", "0.7")
                }), this.$el.find(".tuchong_stock_search_input").focus(function() {
                    t.$el.find(".search-input").css("opacity", "1")
                }), this.$el.find("#tuchong_stock_enter").on("click", function(t) {
                    var e = t.target.className;
                    "tuchong_stock_search_input" !== e && "search-input" !== e && "tuchong_stock_search_btn" !== e && (ga("send", "event", {
                        eventCategory: "guidance",
                        eventAction: "tuchong_creative",
                        eventLabel: "pc,logout,home_banner"
                    }), window.open("https://stock.tuchong.com/?source=tc_pc_home"))
                })
            }
        });
    return i
}), require(["header", "main", "footer"], function(t, e, n) {
    new t, new e, new n
});
