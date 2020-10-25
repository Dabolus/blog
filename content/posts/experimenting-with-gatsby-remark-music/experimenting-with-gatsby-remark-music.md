---
title: 'Experimenting with gatsby-remark-music'
path: '/experimenting-with-gatsby-remark-music'
tags: ['TypeScript']
series: 'Side projects'
featuredImage: './cover.jpg'
excerpt: 'This demo blog post shows how does gatsby-remark-music work.'
created: 2020-03-07T07:45:07.891Z
updated: 2020-03-07T07:45:07.891Z
---

[gatsby-remark-music](https://www.gatsbyjs.org/packages/gatsby-remark-music/) is a [Gatsby](https://www.gatsbyjs.org/) plugin that allows to easily add music sheets to your Gatsby site by using the [abc notation](https://abcnotation.com/). More specifically, it uses the [abcjs](https://www.abcjs.net/) library to render the abc notation to an SVG.

Here's a little example:

§§
X: 24
T:Clouds Thicken
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:6/8
L:1/8
Q:3/8=116
R:Creepy Jig
K:Em
|:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|\
"C7"_B2A "B7"=B3|"Em"EEE E2G|
"C7"_B2A G2F|"Em"GFE "D (Bm7)"F2D|\
1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|
"G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|\
"G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|
§§

The rendered SVG is configurable by passing to the plugin the abcjs configuration options. There is also an additional option - the `color` option - that allows to customize the color of the output SVG. Since the SVG is styled with CSS, you can also use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to make the color dynamic.

For example, this blog automatically switches between dark and light themes based on your system theme. The gatsby-remark-music plugin has been configured to use a CSS variable that changes when the system theme changes, so you will be able to see these music sheets in any case.

Note that the abcjs library is still far from being perfect, especially when the responsive mode is enabled. For example, this is what happens when trying to write a more complicated music sheet:

§§
X:1
T:Auld Lang Syne (Original Version)
C:Traditional
O:Scotland
M:4/4
L:1/8
K:D
V:1 name="Melody" clef=treble
|A2|"D""^Verses"d3 d "A"e2 f2|"D"A3 B "A"A3 A
w:1Should auld ac-quain-tance be for-got, and
w:2We two hae run a-bout the braes, and
w:3We two hae paid-elt in the burn, frae
w:4And here's a hand, my trus-ty fere, and
w:5And sure-ly ye'll be your pint-stoup, and
|"D"d2 f2 "Em"e2 d2|"G"B6 d2
w:nev-er brought to mind? Should
w:pu'd the go-wans fine, We've
w:morn-in sun till dine, But
w:gi‚s a hand o' thine, We'll
w:sure-ly I'll be mine, We'll
|"D"A3 F "A"E2 D2|"Em"E3 D "A"E3 F
w:auld ac-quain-tance be for-got, In
w:wan-dered mony a wea-ry foot, sin'
w:seas be-tween us braid hae roared, sin'
w:tak' a richt gude wil-lie waught, For
w:take a cup of kind-ness yet, for
|A3 A B2 A2|A6||
w:days of auld lang syne?
w:auld_ lang_ syne.
w:auld_ lang_ syne.
w:auld_ lang_ syne.
w:sake of auld lang syne.
V:2 name="Harmony" clef=treble
|ag|:f3 f g2 a2|f3 g f3 f
|f2 a2 g2 f2|g6 g2
|f3 d c2 b2|G3 F G3 A
|c4 d2 c2|c6||
V:1 name="Melody" clef=treble
|A2|"D""^Refrain"d3 d "A"e2 f2|"D"A3 B "A"A3 A
w:For auld_ lang_ syne my dear for
|"D"d2 f2 "Em"e2 d2|"G"B6 d2
w:auld_ lang_ syne. We'll
|"D"A3 F "A"E2 D2|"Em"E3 D "A"E3 F
w:tak' a cup o' kind-ness yet for
|1A4 B2 A2|"A"A6:|2"A"A4 "Em"BA"A"FE|"D"D6||
w:auld lang_ syne. auld lang___ syne.
V:2 name="Harmony" clef=treble
|c2|f3 f g2 a2|f3 g f3 f
|f2 a2 g2 f2|g6 g2
|f3 d c2 B2|G3 F G3 A
|1c4 d2 c2|c6:|2c4 d2 c2|a6||
§§

---

Cover by [Marius Masalar](https://unsplash.com/@marius) on [Unsplash](https://unsplash.com/s/photos/music)
