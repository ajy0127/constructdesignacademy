(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/ui/Section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Section)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
function Section({ children, padding = 'lg', className, id, removePadding, background }) {
    const backgroundClasses = {
        light: 'bg-bg-base',
        dark: 'bg-bg-primary',
        muted: 'bg-bg-sub',
        accent: 'bg-accent-gold'
    };
    const paddings = {
        sm: 'py-12',
        md: 'py-16',
        lg: 'py-24',
        xl: 'py-32'
    };
    const paddingClass = removePadding === 'y' ? '' : removePadding === 't' ? 'pb-24' : removePadding === 'b' ? 'pt-24' : paddings[padding];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(background ? backgroundClasses[background] : '', 'relative isolate', paddingClass, className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Section.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = Section;
var _c;
__turbopack_context__.k.register(_c, "Section");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/RevealCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RevealCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function RevealCard({ title, description, iconSrc, iconAlt, iconNode, className = '', minHeightClass = 'min-h-[280px]', headerNoWrap = false }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHoverCapable, setIsHoverCapable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Detect if the device supports hover (desktop) to enable hover-to-reveal only there
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RevealCard.useEffect": ()=>{
            if ("object" !== 'undefined' && typeof window.matchMedia === 'function') {
                const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
                const update = {
                    "RevealCard.useEffect.update": ()=>setIsHoverCapable(mq.matches)
                }["RevealCard.useEffect.update"];
                update();
                mq.addEventListener?.('change', update);
                return ({
                    "RevealCard.useEffect": ()=>mq.removeEventListener?.('change', update)
                })["RevealCard.useEffect"];
            }
        }
    }["RevealCard.useEffect"], []);
    const toggle = ()=>setSelected((s)=>!s);
    const onKey = (e)=>{
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    };
    const active = selected || isHoverCapable && hovered;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "button",
        tabIndex: 0,
        "aria-pressed": active,
        onClick: toggle,
        onKeyDown: onKey,
        onMouseEnter: ()=>isHoverCapable && setHovered(true),
        onMouseLeave: ()=>isHoverCapable && setHovered(false),
        className: `border border-text-base/10 p-8 rounded-lg transition-colors duration-200 ease-out h-full ${minHeightClass} flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-brass hover:bg-cta-brass hover:border-cta-brass hover:text-black hover:[&_h3]:!text-black hover:[&_p]:!text-black/90 hover:[&_h3]:duration-0 hover:[&_p]:duration-0 ${selected ? 'bg-cta-brass border-cta-brass text-black' : 'text-text-base'} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            initial: false,
            children: !active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    y: -8
                },
                transition: {
                    duration: 0.18
                },
                className: "flex flex-1 flex-col items-center justify-center w-full",
                children: [
                    (iconNode || iconSrc) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[120px] h-[120px] p-2 mb-6 flex items-center justify-center",
                        children: iconNode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-7xl leading-none select-none",
                            children: iconNode
                        }, void 0, false, {
                            fileName: "[project]/components/ui/RevealCard.tsx",
                            lineNumber: 78,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: iconSrc,
                            alt: iconAlt ?? title,
                            width: 120,
                            height: 120,
                            className: "object-contain w-full h-full border-0 ring-0 outline-none shadow-none bg-transparent"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/RevealCard.tsx",
                            lineNumber: 82,
                            columnNumber: 19
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/RevealCard.tsx",
                        lineNumber: 76,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-serif text-xl mb-2",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/RevealCard.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                ]
            }, "front", true, {
                fileName: "[project]/components/ui/RevealCard.tsx",
                lineNumber: 67,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    y: -8
                },
                transition: {
                    duration: 0.18
                },
                className: "flex flex-1 items-center justify-center w-full",
                children: (()=>{
                    const [firstLine, ...restLines] = description.split('\n');
                    const body = restLines.join('\n').trim();
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center max-w-[36ch] mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: `font-serif text-base md:text-lg text-black mb-3 ${headerNoWrap ? 'whitespace-nowrap' : ''}`,
                                children: firstLine
                            }, void 0, false, {
                                fileName: "[project]/components/ui/RevealCard.tsx",
                                lineNumber: 108,
                                columnNumber: 19
                            }, this),
                            body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "body-sm whitespace-pre-line text-black/90",
                                children: body
                            }, void 0, false, {
                                fileName: "[project]/components/ui/RevealCard.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/RevealCard.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this);
                })()
            }, "back", false, {
                fileName: "[project]/components/ui/RevealCard.tsx",
                lineNumber: 95,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/RevealCard.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/RevealCard.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(RevealCard, "a5wVOi0vopS55BMdUygol9KfEb8=");
_c = RevealCard;
var _c;
__turbopack_context__.k.register(_c, "RevealCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/expertise/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Expertise)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$RevealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/RevealCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const expertiseData = [
    {
        id: 'design',
        title: 'Design',
        subtitle: 'Crafting brand identities.',
        icon: '⚙️',
        overlay: {
            title: 'Design Excellence',
            content: [
                'We blend timeless aesthetics with cutting-edge technology to future-proof brands.',
                'Continuous R&D keeps our clients at the forefront without chasing fads.',
                'Innovation is measured not by novelty, but by enduring relevance.'
            ]
        }
    },
    {
        id: 'branding',
        title: 'Branding',
        subtitle: 'Building memorable brands.',
        icon: '🎨',
        overlay: {
            title: 'Brand Strategy',
            content: [
                'Creating cohesive brand experiences that resonate across all touchpoints.',
                'Strategic positioning that differentiates your brand in competitive markets.',
                'Visual identity systems that maintain consistency while allowing flexibility.'
            ]
        }
    },
    {
        id: 'ux-ui',
        title: 'UX/UI',
        subtitle: 'Shaping intuitive experiences.',
        icon: '📱',
        overlay: {
            title: 'User Experience Design',
            content: [
                'User Research & Persona Development',
                'Wireframing & Prototyping',
                'Interaction & Motion Design',
                'Design Systems & Component Libraries'
            ]
        }
    },
    {
        id: 'development',
        title: 'Development',
        subtitle: 'Implementing digital solutions.',
        icon: '⚙️',
        overlay: {
            title: 'Technical Excellence',
            content: [
                'Next.js & TypeScript',
                'Tailwind CSS & Design Tokens',
                'Framer Motion & micro-interactions',
                'Cloud-native deployment on Vercel & AWS'
            ]
        }
    }
];
// Map expertise ids to PNG icons placed in /public
const expertiseIcons = {
    'ux-ui': '/uxuiexpertise.png',
    design: '/Designexpertise.png',
    development: '/Devexpertise.png',
    branding: '/Branding.png'
};
function Expertise() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        id: "expertise",
        className: "bg-bg-primary py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 border-t border-text-base/20"
                        }, void 0, false, {
                            fileName: "[project]/app/expertise/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "heading-2",
                            children: "Our Expertise"
                        }, void 0, false, {
                            fileName: "[project]/app/expertise/page.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 border-t border-text-base/20"
                        }, void 0, false, {
                            fileName: "[project]/app/expertise/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/expertise/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center body mb-10",
                    children: "Core services we offer"
                }, void 0, false, {
                    fileName: "[project]/app/expertise/page.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch",
                    children: expertiseData.map((item, index)=>{
                        const description = [
                            item.subtitle,
                            '',
                            ...item.overlay.content
                        ].join('\n');
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.6,
                                delay: index * 0.2
                            },
                            viewport: {
                                once: true
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$RevealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: item.title,
                                description: description,
                                iconSrc: expertiseIcons[item.id],
                                minHeightClass: "min-h-[340px]",
                                className: "text-center"
                            }, void 0, false, {
                                fileName: "[project]/app/expertise/page.tsx",
                                lineNumber: 107,
                                columnNumber: 17
                            }, this)
                        }, item.id, false, {
                            fileName: "[project]/app/expertise/page.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/expertise/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mt-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contact",
                        className: "cta-button",
                        children: "Build with us →"
                    }, void 0, false, {
                        fileName: "[project]/app/expertise/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/expertise/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/expertise/page.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/expertise/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_c = Expertise;
var _c;
__turbopack_context__.k.register(_c, "Expertise");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_9f3eeb09._.js.map