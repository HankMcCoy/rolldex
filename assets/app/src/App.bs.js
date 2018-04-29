// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Nav$ReactTemplate = require("./Nav.bs.js");
var HomePage$ReactTemplate = require("./HomePage.bs.js");
var SystemsPage$ReactTemplate = require("./SystemsPage.bs.js");
var CampaignsPage$ReactTemplate = require("./CampaignsPage.bs.js");

function reducer(action, _) {
  return /* Update */Block.__(0, [/* record */[/* route */action[0]]]);
}

function mapUrlToRoute(url) {
  var match = url[/* path */0];
  if (match) {
    switch (match[0]) {
      case "campaigns" : 
          if (match[1]) {
            return /* Home */0;
          } else {
            return /* Campaigns */2;
          }
      case "systems" : 
          if (match[1]) {
            return /* Home */0;
          } else {
            return /* Systems */1;
          }
      default:
        return /* Home */0;
    }
  } else {
    return /* Home */0;
  }
}

var component = ReasonReact.reducerComponent("App");

function style(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9, prim$10, prim$11, prim$12, prim$13, prim$14, prim$15, prim$16, prim$17, prim$18, prim$19, prim$20, prim$21, prim$22, prim$23, prim$24, prim$25, prim$26, prim$27, prim$28, prim$29, prim$30, prim$31, prim$32, prim$33, prim$34, prim$35, prim$36, prim$37, prim$38, prim$39, prim$40, prim$41, prim$42, prim$43, prim$44, prim$45, prim$46, prim$47, prim$48, prim$49, prim$50, prim$51, prim$52, prim$53, prim$54, prim$55, prim$56, prim$57, prim$58, prim$59, prim$60, prim$61, prim$62, prim$63, prim$64, prim$65, prim$66, prim$67, prim$68, prim$69, prim$70, prim$71, prim$72, prim$73, prim$74, prim$75, prim$76, prim$77, prim$78, prim$79, prim$80, prim$81, prim$82, prim$83, prim$84, prim$85, prim$86, prim$87, prim$88, prim$89, prim$90, prim$91, prim$92, prim$93, prim$94, prim$95, prim$96, prim$97, prim$98, prim$99, prim$100, prim$101, prim$102, prim$103, prim$104, prim$105, prim$106, prim$107, prim$108, prim$109, prim$110, prim$111, prim$112, prim$113, prim$114, prim$115, prim$116, prim$117, prim$118, prim$119, prim$120, prim$121, prim$122, prim$123, prim$124, prim$125, prim$126, prim$127, prim$128, prim$129, prim$130, prim$131, prim$132, prim$133, prim$134, prim$135, prim$136, prim$137, prim$138, prim$139, prim$140, prim$141, prim$142, prim$143, prim$144, prim$145, prim$146, prim$147, prim$148, prim$149, prim$150, prim$151, prim$152, prim$153, prim$154, prim$155, prim$156, prim$157, prim$158, prim$159, prim$160, prim$161, prim$162, prim$163, prim$164, prim$165, prim$166, prim$167, prim$168, prim$169, prim$170, prim$171, prim$172, prim$173, prim$174, prim$175, prim$176, prim$177, prim$178, prim$179, prim$180, prim$181, prim$182, prim$183, prim$184, prim$185, prim$186, prim$187, prim$188, prim$189, prim$190, prim$191, prim$192, prim$193, prim$194, prim$195, prim$196, prim$197, prim$198, prim$199, prim$200, prim$201, prim$202, prim$203, prim$204, prim$205, prim$206, prim$207, prim$208, prim$209, prim$210, prim$211, prim$212, prim$213, prim$214, prim$215, prim$216, prim$217, prim$218, prim$219, prim$220, prim$221, prim$222, prim$223, prim$224, prim$225, prim$226, prim$227, prim$228, prim$229, prim$230, prim$231, prim$232, prim$233, prim$234, prim$235, prim$236, prim$237, prim$238, prim$239, prim$240, prim$241, prim$242, prim$243, prim$244, prim$245, prim$246, prim$247, prim$248, prim$249, prim$250, prim$251, prim$252, prim$253, prim$254, prim$255, prim$256, prim$257, prim$258, prim$259, prim$260, prim$261, prim$262, prim$263, prim$264, prim$265, prim$266, prim$267, prim$268, prim$269, prim$270, prim$271, prim$272, prim$273, prim$274, prim$275, prim$276, prim$277, prim$278, prim$279, prim$280, prim$281, prim$282, prim$283, prim$284, prim$285, prim$286, prim$287, prim$288, prim$289, prim$290, prim$291, prim$292, prim$293, prim$294, prim$295, prim$296, prim$297, prim$298, prim$299, prim$300, prim$301, prim$302, prim$303, prim$304, prim$305, prim$306, prim$307, prim$308, prim$309, prim$310, prim$311, prim$312, prim$313, prim$314, prim$315, prim$316, prim$317, prim$318, prim$319, prim$320, prim$321, prim$322, prim$323, prim$324, prim$325, prim$326, prim$327, prim$328, prim$329, prim$330, prim$331, prim$332, prim$333, prim$334, prim$335, prim$336, prim$337, prim$338, prim$339, prim$340, prim$341, prim$342, prim$343, prim$344, prim$345, prim$346, _) {
  var tmp = { };
  if (prim) {
    tmp.azimuth = prim[0];
  }
  if (prim$1) {
    tmp.background = prim$1[0];
  }
  if (prim$2) {
    tmp.backgroundAttachment = prim$2[0];
  }
  if (prim$3) {
    tmp.backgroundColor = prim$3[0];
  }
  if (prim$4) {
    tmp.backgroundImage = prim$4[0];
  }
  if (prim$5) {
    tmp.backgroundPosition = prim$5[0];
  }
  if (prim$6) {
    tmp.backgroundRepeat = prim$6[0];
  }
  if (prim$7) {
    tmp.border = prim$7[0];
  }
  if (prim$8) {
    tmp.borderCollapse = prim$8[0];
  }
  if (prim$9) {
    tmp.borderColor = prim$9[0];
  }
  if (prim$10) {
    tmp.borderSpacing = prim$10[0];
  }
  if (prim$11) {
    tmp.borderStyle = prim$11[0];
  }
  if (prim$12) {
    tmp.borderTop = prim$12[0];
  }
  if (prim$13) {
    tmp.borderRight = prim$13[0];
  }
  if (prim$14) {
    tmp.borderBottom = prim$14[0];
  }
  if (prim$15) {
    tmp.borderLeft = prim$15[0];
  }
  if (prim$16) {
    tmp.borderTopColor = prim$16[0];
  }
  if (prim$17) {
    tmp.borderRightColor = prim$17[0];
  }
  if (prim$18) {
    tmp.borderBottomColor = prim$18[0];
  }
  if (prim$19) {
    tmp.borderLeftColor = prim$19[0];
  }
  if (prim$20) {
    tmp.borderTopStyle = prim$20[0];
  }
  if (prim$21) {
    tmp.borderRightStyle = prim$21[0];
  }
  if (prim$22) {
    tmp.borderBottomStyle = prim$22[0];
  }
  if (prim$23) {
    tmp.borderLeftStyle = prim$23[0];
  }
  if (prim$24) {
    tmp.borderTopWidth = prim$24[0];
  }
  if (prim$25) {
    tmp.borderRightWidth = prim$25[0];
  }
  if (prim$26) {
    tmp.borderBottomWidth = prim$26[0];
  }
  if (prim$27) {
    tmp.borderLeftWidth = prim$27[0];
  }
  if (prim$28) {
    tmp.borderWidth = prim$28[0];
  }
  if (prim$29) {
    tmp.bottom = prim$29[0];
  }
  if (prim$30) {
    tmp.captionSide = prim$30[0];
  }
  if (prim$31) {
    tmp.clear = prim$31[0];
  }
  if (prim$32) {
    tmp.clip = prim$32[0];
  }
  if (prim$33) {
    tmp.color = prim$33[0];
  }
  if (prim$34) {
    tmp.content = prim$34[0];
  }
  if (prim$35) {
    tmp.counterIncrement = prim$35[0];
  }
  if (prim$36) {
    tmp.counterReset = prim$36[0];
  }
  if (prim$37) {
    tmp.cue = prim$37[0];
  }
  if (prim$38) {
    tmp.cueAfter = prim$38[0];
  }
  if (prim$39) {
    tmp.cueBefore = prim$39[0];
  }
  if (prim$40) {
    tmp.cursor = prim$40[0];
  }
  if (prim$41) {
    tmp.direction = prim$41[0];
  }
  if (prim$42) {
    tmp.display = prim$42[0];
  }
  if (prim$43) {
    tmp.elevation = prim$43[0];
  }
  if (prim$44) {
    tmp.emptyCells = prim$44[0];
  }
  if (prim$45) {
    tmp.float = prim$45[0];
  }
  if (prim$46) {
    tmp.font = prim$46[0];
  }
  if (prim$47) {
    tmp.fontFamily = prim$47[0];
  }
  if (prim$48) {
    tmp.fontSize = prim$48[0];
  }
  if (prim$49) {
    tmp.fontSizeAdjust = prim$49[0];
  }
  if (prim$50) {
    tmp.fontStretch = prim$50[0];
  }
  if (prim$51) {
    tmp.fontStyle = prim$51[0];
  }
  if (prim$52) {
    tmp.fontVariant = prim$52[0];
  }
  if (prim$53) {
    tmp.fontWeight = prim$53[0];
  }
  if (prim$54) {
    tmp.height = prim$54[0];
  }
  if (prim$55) {
    tmp.left = prim$55[0];
  }
  if (prim$56) {
    tmp.letterSpacing = prim$56[0];
  }
  if (prim$57) {
    tmp.lineHeight = prim$57[0];
  }
  if (prim$58) {
    tmp.listStyle = prim$58[0];
  }
  if (prim$59) {
    tmp.listStyleImage = prim$59[0];
  }
  if (prim$60) {
    tmp.listStylePosition = prim$60[0];
  }
  if (prim$61) {
    tmp.listStyleType = prim$61[0];
  }
  if (prim$62) {
    tmp.margin = prim$62[0];
  }
  if (prim$63) {
    tmp.marginTop = prim$63[0];
  }
  if (prim$64) {
    tmp.marginRight = prim$64[0];
  }
  if (prim$65) {
    tmp.marginBottom = prim$65[0];
  }
  if (prim$66) {
    tmp.marginLeft = prim$66[0];
  }
  if (prim$67) {
    tmp.markerOffset = prim$67[0];
  }
  if (prim$68) {
    tmp.marks = prim$68[0];
  }
  if (prim$69) {
    tmp.maxHeight = prim$69[0];
  }
  if (prim$70) {
    tmp.maxWidth = prim$70[0];
  }
  if (prim$71) {
    tmp.minHeight = prim$71[0];
  }
  if (prim$72) {
    tmp.minWidth = prim$72[0];
  }
  if (prim$73) {
    tmp.orphans = prim$73[0];
  }
  if (prim$74) {
    tmp.outline = prim$74[0];
  }
  if (prim$75) {
    tmp.outlineColor = prim$75[0];
  }
  if (prim$76) {
    tmp.outlineStyle = prim$76[0];
  }
  if (prim$77) {
    tmp.outlineWidth = prim$77[0];
  }
  if (prim$78) {
    tmp.overflow = prim$78[0];
  }
  if (prim$79) {
    tmp.overflowX = prim$79[0];
  }
  if (prim$80) {
    tmp.overflowY = prim$80[0];
  }
  if (prim$81) {
    tmp.padding = prim$81[0];
  }
  if (prim$82) {
    tmp.paddingTop = prim$82[0];
  }
  if (prim$83) {
    tmp.paddingRight = prim$83[0];
  }
  if (prim$84) {
    tmp.paddingBottom = prim$84[0];
  }
  if (prim$85) {
    tmp.paddingLeft = prim$85[0];
  }
  if (prim$86) {
    tmp.page = prim$86[0];
  }
  if (prim$87) {
    tmp.pageBreakAfter = prim$87[0];
  }
  if (prim$88) {
    tmp.pageBreakBefore = prim$88[0];
  }
  if (prim$89) {
    tmp.pageBreakInside = prim$89[0];
  }
  if (prim$90) {
    tmp.pause = prim$90[0];
  }
  if (prim$91) {
    tmp.pauseAfter = prim$91[0];
  }
  if (prim$92) {
    tmp.pauseBefore = prim$92[0];
  }
  if (prim$93) {
    tmp.pitch = prim$93[0];
  }
  if (prim$94) {
    tmp.pitchRange = prim$94[0];
  }
  if (prim$95) {
    tmp.playDuring = prim$95[0];
  }
  if (prim$96) {
    tmp.position = prim$96[0];
  }
  if (prim$97) {
    tmp.quotes = prim$97[0];
  }
  if (prim$98) {
    tmp.richness = prim$98[0];
  }
  if (prim$99) {
    tmp.right = prim$99[0];
  }
  if (prim$100) {
    tmp.size = prim$100[0];
  }
  if (prim$101) {
    tmp.speak = prim$101[0];
  }
  if (prim$102) {
    tmp.speakHeader = prim$102[0];
  }
  if (prim$103) {
    tmp.speakNumeral = prim$103[0];
  }
  if (prim$104) {
    tmp.speakPunctuation = prim$104[0];
  }
  if (prim$105) {
    tmp.speechRate = prim$105[0];
  }
  if (prim$106) {
    tmp.stress = prim$106[0];
  }
  if (prim$107) {
    tmp.tableLayout = prim$107[0];
  }
  if (prim$108) {
    tmp.textAlign = prim$108[0];
  }
  if (prim$109) {
    tmp.textDecoration = prim$109[0];
  }
  if (prim$110) {
    tmp.textIndent = prim$110[0];
  }
  if (prim$111) {
    tmp.textShadow = prim$111[0];
  }
  if (prim$112) {
    tmp.textTransform = prim$112[0];
  }
  if (prim$113) {
    tmp.top = prim$113[0];
  }
  if (prim$114) {
    tmp.unicodeBidi = prim$114[0];
  }
  if (prim$115) {
    tmp.verticalAlign = prim$115[0];
  }
  if (prim$116) {
    tmp.visibility = prim$116[0];
  }
  if (prim$117) {
    tmp.voiceFamily = prim$117[0];
  }
  if (prim$118) {
    tmp.volume = prim$118[0];
  }
  if (prim$119) {
    tmp.whiteSpace = prim$119[0];
  }
  if (prim$120) {
    tmp.widows = prim$120[0];
  }
  if (prim$121) {
    tmp.width = prim$121[0];
  }
  if (prim$122) {
    tmp.wordSpacing = prim$122[0];
  }
  if (prim$123) {
    tmp.zIndex = prim$123[0];
  }
  if (prim$124) {
    tmp.opacity = prim$124[0];
  }
  if (prim$125) {
    tmp.backgroundOrigin = prim$125[0];
  }
  if (prim$126) {
    tmp.backgroundSize = prim$126[0];
  }
  if (prim$127) {
    tmp.backgroundClip = prim$127[0];
  }
  if (prim$128) {
    tmp.borderRadius = prim$128[0];
  }
  if (prim$129) {
    tmp.borderTopLeftRadius = prim$129[0];
  }
  if (prim$130) {
    tmp.borderTopRightRadius = prim$130[0];
  }
  if (prim$131) {
    tmp.borderBottomLeftRadius = prim$131[0];
  }
  if (prim$132) {
    tmp.borderBottomRightRadius = prim$132[0];
  }
  if (prim$133) {
    tmp.borderImage = prim$133[0];
  }
  if (prim$134) {
    tmp.borderImageSource = prim$134[0];
  }
  if (prim$135) {
    tmp.borderImageSlice = prim$135[0];
  }
  if (prim$136) {
    tmp.borderImageWidth = prim$136[0];
  }
  if (prim$137) {
    tmp.borderImageOutset = prim$137[0];
  }
  if (prim$138) {
    tmp.borderImageRepeat = prim$138[0];
  }
  if (prim$139) {
    tmp.boxShadow = prim$139[0];
  }
  if (prim$140) {
    tmp.columns = prim$140[0];
  }
  if (prim$141) {
    tmp.columnCount = prim$141[0];
  }
  if (prim$142) {
    tmp.columnFill = prim$142[0];
  }
  if (prim$143) {
    tmp.columnGap = prim$143[0];
  }
  if (prim$144) {
    tmp.columnRule = prim$144[0];
  }
  if (prim$145) {
    tmp.columnRuleColor = prim$145[0];
  }
  if (prim$146) {
    tmp.columnRuleStyle = prim$146[0];
  }
  if (prim$147) {
    tmp.columnRuleWidth = prim$147[0];
  }
  if (prim$148) {
    tmp.columnSpan = prim$148[0];
  }
  if (prim$149) {
    tmp.columnWidth = prim$149[0];
  }
  if (prim$150) {
    tmp.breakAfter = prim$150[0];
  }
  if (prim$151) {
    tmp.breakBefore = prim$151[0];
  }
  if (prim$152) {
    tmp.breakInside = prim$152[0];
  }
  if (prim$153) {
    tmp.rest = prim$153[0];
  }
  if (prim$154) {
    tmp.restAfter = prim$154[0];
  }
  if (prim$155) {
    tmp.restBefore = prim$155[0];
  }
  if (prim$156) {
    tmp.speakAs = prim$156[0];
  }
  if (prim$157) {
    tmp.voiceBalance = prim$157[0];
  }
  if (prim$158) {
    tmp.voiceDuration = prim$158[0];
  }
  if (prim$159) {
    tmp.voicePitch = prim$159[0];
  }
  if (prim$160) {
    tmp.voiceRange = prim$160[0];
  }
  if (prim$161) {
    tmp.voiceRate = prim$161[0];
  }
  if (prim$162) {
    tmp.voiceStress = prim$162[0];
  }
  if (prim$163) {
    tmp.voiceVolume = prim$163[0];
  }
  if (prim$164) {
    tmp.objectFit = prim$164[0];
  }
  if (prim$165) {
    tmp.objectPosition = prim$165[0];
  }
  if (prim$166) {
    tmp.imageResolution = prim$166[0];
  }
  if (prim$167) {
    tmp.imageOrientation = prim$167[0];
  }
  if (prim$168) {
    tmp.alignContent = prim$168[0];
  }
  if (prim$169) {
    tmp.alignItems = prim$169[0];
  }
  if (prim$170) {
    tmp.alignSelf = prim$170[0];
  }
  if (prim$171) {
    tmp.flex = prim$171[0];
  }
  if (prim$172) {
    tmp.flexBasis = prim$172[0];
  }
  if (prim$173) {
    tmp.flexDirection = prim$173[0];
  }
  if (prim$174) {
    tmp.flexFlow = prim$174[0];
  }
  if (prim$175) {
    tmp.flexGrow = prim$175[0];
  }
  if (prim$176) {
    tmp.flexShrink = prim$176[0];
  }
  if (prim$177) {
    tmp.flexWrap = prim$177[0];
  }
  if (prim$178) {
    tmp.justifyContent = prim$178[0];
  }
  if (prim$179) {
    tmp.order = prim$179[0];
  }
  if (prim$180) {
    tmp.textDecorationColor = prim$180[0];
  }
  if (prim$181) {
    tmp.textDecorationLine = prim$181[0];
  }
  if (prim$182) {
    tmp.textDecorationSkip = prim$182[0];
  }
  if (prim$183) {
    tmp.textDecorationStyle = prim$183[0];
  }
  if (prim$184) {
    tmp.textEmphasis = prim$184[0];
  }
  if (prim$185) {
    tmp.textEmphasisColor = prim$185[0];
  }
  if (prim$186) {
    tmp.textEmphasisPosition = prim$186[0];
  }
  if (prim$187) {
    tmp.textEmphasisStyle = prim$187[0];
  }
  if (prim$188) {
    tmp.textUnderlinePosition = prim$188[0];
  }
  if (prim$189) {
    tmp.fontFeatureSettings = prim$189[0];
  }
  if (prim$190) {
    tmp.fontKerning = prim$190[0];
  }
  if (prim$191) {
    tmp.fontLanguageOverride = prim$191[0];
  }
  if (prim$192) {
    tmp.fontSynthesis = prim$192[0];
  }
  if (prim$193) {
    tmp.forntVariantAlternates = prim$193[0];
  }
  if (prim$194) {
    tmp.fontVariantCaps = prim$194[0];
  }
  if (prim$195) {
    tmp.fontVariantEastAsian = prim$195[0];
  }
  if (prim$196) {
    tmp.fontVariantLigatures = prim$196[0];
  }
  if (prim$197) {
    tmp.fontVariantNumeric = prim$197[0];
  }
  if (prim$198) {
    tmp.fontVariantPosition = prim$198[0];
  }
  if (prim$199) {
    tmp.all = prim$199[0];
  }
  if (prim$200) {
    tmp.glyphOrientationVertical = prim$200[0];
  }
  if (prim$201) {
    tmp.textCombineUpright = prim$201[0];
  }
  if (prim$202) {
    tmp.textOrientation = prim$202[0];
  }
  if (prim$203) {
    tmp.writingMode = prim$203[0];
  }
  if (prim$204) {
    tmp.shapeImageThreshold = prim$204[0];
  }
  if (prim$205) {
    tmp.shapeMargin = prim$205[0];
  }
  if (prim$206) {
    tmp.shapeOutside = prim$206[0];
  }
  if (prim$207) {
    tmp.clipPath = prim$207[0];
  }
  if (prim$208) {
    tmp.clipRule = prim$208[0];
  }
  if (prim$209) {
    tmp.mask = prim$209[0];
  }
  if (prim$210) {
    tmp.maskBorder = prim$210[0];
  }
  if (prim$211) {
    tmp.maskBorderMode = prim$211[0];
  }
  if (prim$212) {
    tmp.maskBorderOutset = prim$212[0];
  }
  if (prim$213) {
    tmp.maskBorderRepeat = prim$213[0];
  }
  if (prim$214) {
    tmp.maskBorderSlice = prim$214[0];
  }
  if (prim$215) {
    tmp.maskBorderSource = prim$215[0];
  }
  if (prim$216) {
    tmp.maskBorderWidth = prim$216[0];
  }
  if (prim$217) {
    tmp.maskClip = prim$217[0];
  }
  if (prim$218) {
    tmp.maskComposite = prim$218[0];
  }
  if (prim$219) {
    tmp.maskImage = prim$219[0];
  }
  if (prim$220) {
    tmp.maskMode = prim$220[0];
  }
  if (prim$221) {
    tmp.maskOrigin = prim$221[0];
  }
  if (prim$222) {
    tmp.maskPosition = prim$222[0];
  }
  if (prim$223) {
    tmp.maskRepeat = prim$223[0];
  }
  if (prim$224) {
    tmp.maskSize = prim$224[0];
  }
  if (prim$225) {
    tmp.maskType = prim$225[0];
  }
  if (prim$226) {
    tmp.backgroundBlendMode = prim$226[0];
  }
  if (prim$227) {
    tmp.isolation = prim$227[0];
  }
  if (prim$228) {
    tmp.mixBlendMode = prim$228[0];
  }
  if (prim$229) {
    tmp.boxDecorationBreak = prim$229[0];
  }
  if (prim$230) {
    tmp.boxSizing = prim$230[0];
  }
  if (prim$231) {
    tmp.caretColor = prim$231[0];
  }
  if (prim$232) {
    tmp.navDown = prim$232[0];
  }
  if (prim$233) {
    tmp.navLeft = prim$233[0];
  }
  if (prim$234) {
    tmp.navRight = prim$234[0];
  }
  if (prim$235) {
    tmp.navUp = prim$235[0];
  }
  if (prim$236) {
    tmp.outlineOffset = prim$236[0];
  }
  if (prim$237) {
    tmp.resize = prim$237[0];
  }
  if (prim$238) {
    tmp.textOverflow = prim$238[0];
  }
  if (prim$239) {
    tmp.grid = prim$239[0];
  }
  if (prim$240) {
    tmp.gridArea = prim$240[0];
  }
  if (prim$241) {
    tmp.gridAutoColumns = prim$241[0];
  }
  if (prim$242) {
    tmp.gridAutoFlow = prim$242[0];
  }
  if (prim$243) {
    tmp.gridAutoRows = prim$243[0];
  }
  if (prim$244) {
    tmp.gridColumn = prim$244[0];
  }
  if (prim$245) {
    tmp.gridColumnEnd = prim$245[0];
  }
  if (prim$246) {
    tmp.gridColumnGap = prim$246[0];
  }
  if (prim$247) {
    tmp.gridColumnStart = prim$247[0];
  }
  if (prim$248) {
    tmp.gridGap = prim$248[0];
  }
  if (prim$249) {
    tmp.gridRow = prim$249[0];
  }
  if (prim$250) {
    tmp.gridRowEnd = prim$250[0];
  }
  if (prim$251) {
    tmp.gridRowGap = prim$251[0];
  }
  if (prim$252) {
    tmp.gridRowStart = prim$252[0];
  }
  if (prim$253) {
    tmp.gridTemplate = prim$253[0];
  }
  if (prim$254) {
    tmp.gridTemplateAreas = prim$254[0];
  }
  if (prim$255) {
    tmp.gridTemplateColumns = prim$255[0];
  }
  if (prim$256) {
    tmp.gridTemplateRows = prim$256[0];
  }
  if (prim$257) {
    tmp.willChange = prim$257[0];
  }
  if (prim$258) {
    tmp.hangingPunctuation = prim$258[0];
  }
  if (prim$259) {
    tmp.hyphens = prim$259[0];
  }
  if (prim$260) {
    tmp.lineBreak = prim$260[0];
  }
  if (prim$261) {
    tmp.overflowWrap = prim$261[0];
  }
  if (prim$262) {
    tmp.tabSize = prim$262[0];
  }
  if (prim$263) {
    tmp.textAlignLast = prim$263[0];
  }
  if (prim$264) {
    tmp.textJustify = prim$264[0];
  }
  if (prim$265) {
    tmp.wordBreak = prim$265[0];
  }
  if (prim$266) {
    tmp.wordWrap = prim$266[0];
  }
  if (prim$267) {
    tmp.animation = prim$267[0];
  }
  if (prim$268) {
    tmp.animationDelay = prim$268[0];
  }
  if (prim$269) {
    tmp.animationDirection = prim$269[0];
  }
  if (prim$270) {
    tmp.animationDuration = prim$270[0];
  }
  if (prim$271) {
    tmp.animationFillMode = prim$271[0];
  }
  if (prim$272) {
    tmp.animationIterationCount = prim$272[0];
  }
  if (prim$273) {
    tmp.animationName = prim$273[0];
  }
  if (prim$274) {
    tmp.animationPlayState = prim$274[0];
  }
  if (prim$275) {
    tmp.animationTimingFunction = prim$275[0];
  }
  if (prim$276) {
    tmp.transition = prim$276[0];
  }
  if (prim$277) {
    tmp.transitionDelay = prim$277[0];
  }
  if (prim$278) {
    tmp.transitionDuration = prim$278[0];
  }
  if (prim$279) {
    tmp.transitionProperty = prim$279[0];
  }
  if (prim$280) {
    tmp.transitionTimingFunction = prim$280[0];
  }
  if (prim$281) {
    tmp.backfaceVisibility = prim$281[0];
  }
  if (prim$282) {
    tmp.perspective = prim$282[0];
  }
  if (prim$283) {
    tmp.perspectiveOrigin = prim$283[0];
  }
  if (prim$284) {
    tmp.transform = prim$284[0];
  }
  if (prim$285) {
    tmp.transformOrigin = prim$285[0];
  }
  if (prim$286) {
    tmp.transformStyle = prim$286[0];
  }
  if (prim$287) {
    tmp.justifyItems = prim$287[0];
  }
  if (prim$288) {
    tmp.justifySelf = prim$288[0];
  }
  if (prim$289) {
    tmp.placeContent = prim$289[0];
  }
  if (prim$290) {
    tmp.placeItems = prim$290[0];
  }
  if (prim$291) {
    tmp.placeSelf = prim$291[0];
  }
  if (prim$292) {
    tmp.appearance = prim$292[0];
  }
  if (prim$293) {
    tmp.caret = prim$293[0];
  }
  if (prim$294) {
    tmp.caretAnimation = prim$294[0];
  }
  if (prim$295) {
    tmp.caretShape = prim$295[0];
  }
  if (prim$296) {
    tmp.userSelect = prim$296[0];
  }
  if (prim$297) {
    tmp.maxLines = prim$297[0];
  }
  if (prim$298) {
    tmp.marqueeDirection = prim$298[0];
  }
  if (prim$299) {
    tmp.marqueeLoop = prim$299[0];
  }
  if (prim$300) {
    tmp.marqueeSpeed = prim$300[0];
  }
  if (prim$301) {
    tmp.marqueeStyle = prim$301[0];
  }
  if (prim$302) {
    tmp.overflowStyle = prim$302[0];
  }
  if (prim$303) {
    tmp.rotation = prim$303[0];
  }
  if (prim$304) {
    tmp.rotationPoint = prim$304[0];
  }
  if (prim$305) {
    tmp.alignmentBaseline = prim$305[0];
  }
  if (prim$306) {
    tmp.baselineShift = prim$306[0];
  }
  if (prim$307) {
    tmp.clip = prim$307[0];
  }
  if (prim$308) {
    tmp.clipPath = prim$308[0];
  }
  if (prim$309) {
    tmp.clipRule = prim$309[0];
  }
  if (prim$310) {
    tmp.colorInterpolation = prim$310[0];
  }
  if (prim$311) {
    tmp.colorInterpolationFilters = prim$311[0];
  }
  if (prim$312) {
    tmp.colorProfile = prim$312[0];
  }
  if (prim$313) {
    tmp.colorRendering = prim$313[0];
  }
  if (prim$314) {
    tmp.cursor = prim$314[0];
  }
  if (prim$315) {
    tmp.dominantBaseline = prim$315[0];
  }
  if (prim$316) {
    tmp.fill = prim$316[0];
  }
  if (prim$317) {
    tmp.fillOpacity = prim$317[0];
  }
  if (prim$318) {
    tmp.fillRule = prim$318[0];
  }
  if (prim$319) {
    tmp.filter = prim$319[0];
  }
  if (prim$320) {
    tmp.floodColor = prim$320[0];
  }
  if (prim$321) {
    tmp.floodOpacity = prim$321[0];
  }
  if (prim$322) {
    tmp.glyphOrientationHorizontal = prim$322[0];
  }
  if (prim$323) {
    tmp.glyphOrientationVertical = prim$323[0];
  }
  if (prim$324) {
    tmp.imageRendering = prim$324[0];
  }
  if (prim$325) {
    tmp.kerning = prim$325[0];
  }
  if (prim$326) {
    tmp.lightingColor = prim$326[0];
  }
  if (prim$327) {
    tmp.markerEnd = prim$327[0];
  }
  if (prim$328) {
    tmp.markerMid = prim$328[0];
  }
  if (prim$329) {
    tmp.markerStart = prim$329[0];
  }
  if (prim$330) {
    tmp.pointerEvents = prim$330[0];
  }
  if (prim$331) {
    tmp.shapeRendering = prim$331[0];
  }
  if (prim$332) {
    tmp.stopColor = prim$332[0];
  }
  if (prim$333) {
    tmp.stopOpacity = prim$333[0];
  }
  if (prim$334) {
    tmp.stroke = prim$334[0];
  }
  if (prim$335) {
    tmp.strokeDasharray = prim$335[0];
  }
  if (prim$336) {
    tmp.strokeDashoffset = prim$336[0];
  }
  if (prim$337) {
    tmp.strokeLinecap = prim$337[0];
  }
  if (prim$338) {
    tmp.strokeLinejoin = prim$338[0];
  }
  if (prim$339) {
    tmp.strokeMiterlimit = prim$339[0];
  }
  if (prim$340) {
    tmp.strokeOpacity = prim$340[0];
  }
  if (prim$341) {
    tmp.strokeWidth = prim$341[0];
  }
  if (prim$342) {
    tmp.textAnchor = prim$342[0];
  }
  if (prim$343) {
    tmp.textRendering = prim$343[0];
  }
  if (prim$344) {
    tmp.rubyAlign = prim$344[0];
  }
  if (prim$345) {
    tmp.rubyMerge = prim$345[0];
  }
  if (prim$346) {
    tmp.rubyPosition = prim$346[0];
  }
  return tmp;
}

function make() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */1][/* route */0];
              var tmp;
              switch (match) {
                case 0 : 
                    tmp = ReasonReact.element(/* None */0, /* None */0, HomePage$ReactTemplate.make(/* array */[]));
                    break;
                case 1 : 
                    tmp = ReasonReact.element(/* None */0, /* None */0, SystemsPage$ReactTemplate.make(/* array */[]));
                    break;
                case 2 : 
                    tmp = ReasonReact.element(/* None */0, /* None */0, CampaignsPage$ReactTemplate.make(/* array */[]));
                    break;
                
              }
              return React.createElement("div", {
                          style: style(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */["flex"], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0)
                        }, React.createElement("div", {
                              style: style(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */["100vh"], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */["300px"], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0)
                            }, ReasonReact.element(/* None */0, /* None */0, Nav$ReactTemplate.make(self[/* state */1][/* route */0], /* array */[]))), React.createElement("div", undefined, tmp));
            }),
          /* initialState */(function () {
              return /* record */[/* route : Home */0];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */(function (self) {
              return /* :: */[
                      /* Sub */[
                        (function () {
                            return ReasonReact.Router[/* watchUrl */1]((function (url) {
                                          return Curry._1(self[/* send */3], /* ChangeRoute */[mapUrlToRoute(url)]);
                                        }));
                          }),
                        ReasonReact.Router[/* unwatchUrl */2]
                      ],
                      /* [] */0
                    ];
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.reducer = reducer;
exports.mapUrlToRoute = mapUrlToRoute;
exports.component = component;
exports.style = style;
exports.make = make;
/* component Not a pure module */
