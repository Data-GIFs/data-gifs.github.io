const defaultState = {
    "gallery": [
        {
            "title": "How the Coronavirus spread across America?",
            "source": "https://twitter.com/nytimes/status/1241387140933652481",
            "url": "acrossUSA",
            "author": "New York Times"
        },
        {
            "title": "Which countries have flattened the curve for the coronavirus?",
            "source": "https://twitter.com/nytimes/status/1240790201414438912",
            "url": "virusCurve",
            "author": "New York Times"
        },
        {
            "title": "Manhattan work and sleep",
            "source": "https://www.darkhorseanalytics.com/blog/breathing-city/",
            "url": "breathingcity",
            "author": "Joey Cherdarchuk"
        },
        {
            "title": "The shape-shifting US income distribution",
            "source": "https://twitter.com/FT/status/674759218545717252",
            "url": "middleClass",
            "author": "Financial Times"
        },
        {
            "title": "Americans are growing bigger",
            "source": "https://flowingdata.com/2016/06/14/growing-to-obesity/",
            "url": "biggerAmerican",
            "author": "Flowing Data"
        },
    ],
    "space": [
        {
            "factor": "Animation Encoding",
            "desc": "considers the information encoded by the GIF playing progress. The animation can be divided into temporal and non-temporal categories, due to the wide utilization of animation for tracking changes over time. We further extract three different types of animations in non-temporal data-GIFs, namely, faceting, narrative, and setup.",
            "choices": [
                {
                    "type": "Temporal",
                    "definition": "The majority of data-GIFs communicate temporal changes of a data set. One possible explanation might be that people naturally link the temporal context with the GIF playing progress, thereby resulting in a large number of data-GIFs in this category.",
                    "icon": "temporal",
                    "example": "temporal",
                },
                {
                    "type": "Faceting",
                    "definition": "Faceting GIFs are designed to show the facets of a data set in a series of frames respectively. For example, different data items are encoded in a set of frames regarding the same attribute for comparison, or different attributes of a data item are presented continuously to deliver complementary views.",
                    "icon": "faceting",
                    "example": "faceting",
                },
                {
                    "type": "Narrative",
                    "definition": "This type builds a narration during the animation, where it introduces problems, provides data contexts, and complements explanatory texts. Most are revealed in a step-by-step presentation, guiding viewers' attention along with the narrative through highlighting and annotating.",
                    "icon": "narrative",
                    "example": "narrative",
                },
                {
                    "type": "Setup",
                    "definition": "Setup GIFs animate the creation of a visualization. They only build the visualization scene but do not encode data by the animation process and speed.",
                    "icon": "setup",
                    "example": "setup",
                },
            ]  
        },
        {
            "factor": "Context Preservation",
            "desc": "examines techniques used in data-GIFs that help reveal the connection among frames and keep the reading progress contextualized, answering the question \"How can viewers track the previous data within a loop?\" The techniques are described regarding the extents, i.e., no context preserved, partial context preserved (baseline, trails, overview), and entire context preserved (long exposure).",
            "choices": [
                {
                    "type": "No context preservation",
                    "definition": "Most data-GIFs just play the animation straight through and do not preserve previous data, thus requiring the mental memory of viewers to follow the GIF.",
                    "icon": "no",
                    "example": "",
                },
                {
                    "type": "Baseline",
                    "definition": "Baseline designs freeze the content in the first frame of the loop as a baseline during the animation, thereby allowing for comparison with the later frames. Typically, it can directly preserve the first frame and adjust the opacity to alleviate clutter, and some even change the representation.",
                    "icon": "baseline",
                    "example": "baseline",
                },
                {
                    "type": "Trails",
                    "definition": "Trail designs track the data changes between consecutive frames with the GIF playing. It is similar to the superimposed trail variant of Rosling’s animation.",
                    "icon": "trails",
                    "example": "trails",
                },
                {
                    "type": "Overview",
                    "definition": "This type incorporates an overview frame in the GIF frame sequence, which presents a summary of data. For example, the gray points shown from the beginning foreshow the upcoming points and guide the anticipation of the viewers.",
                    "icon": "overview",
                    "example": "overview",
                },
                {
                    "type": "Long exposure",
                    "definition": "This naming is borrowed from the term in photography, which retains information from previous frames. In data-GIFs, long exposure overlays data from all previous frames on the current frame with the GIF playing. For example, the colored line is growing spirally, and the new growth overlays on the previous one.",
                    "icon": "longexposure",
                    "example": "longexposure",
                },
            ]
        },
        {
            "factor": "Repetition",
            "desc": "considers \"what happens after the GIF is played once?\" Since GIFs are particularly featured with automatic repetition, we examine how the between-loop design can influence the reading experience of viewers.",
            "choices": [
                {
                    "type": "Loop",
                    "definition": "Most data-GIFs do not have obvious designs that enable viewers to identify the end or the start of a certain loop. They just directly start a new loop once the last loop ends, while several transition from the end of the last loop to the start of the new loop, completing a seamless transition between two consecutive loops.",
                    "icon": "loop",
                    "example": "loop",
                },
                {
                    "type": "Pause",
                    "definition": "Some data-GIFs deliberately pause a while before starting the new loop, thus forming a \"freeze\" of the last frame. This technique helps viewers to clearly identify each repetition.",
                    "icon": "pause",
                    "example": "pause",
                },
                {
                    "type": "Bounce",
                    "definition": "Bouncing GIFs play the animation once and then reverse it to the start state of the loop. It works similarly to tracing back the history.",
                    "icon": "bounce",
                    "example": "bounce",
                }
            ]
        },
        {
            "factor": "Narrative Progress",
            "desc": "describes how viewers identify the current playback progress.",
            "choices": [
                {
                    "type": "Narrative progress",
                    "definition": "Some data-GIFs incorporate designs of narrative progress within each frame. For example, they directly uses a timeline to showcase the progress or provide a supplementary chart to indicate the progress over time.",
                    "icon": "with",
                    "example": "overview",
                },
                {
                    "type": "None",
                    "definition": "Most GIFs do not provide obvious narrative progress designs, thus requiring viewers to perceive the playback progress themselves. This could be difficult especially under the scenario of automatic repetition.",
                    "icon": "without",
                    "example": "",
                },
            ]
        },
    ],
    'suggestions': [
        {
            "title": "Use animation to convey temporal process",
            "desc": "Animation in data-GIFs is used to convey different meanings, e.g., temporal, faceting, narrative, and setup. Viewers tend to conflate frames with time, even for non-temporal GIFs, such as regarding narrative as a presentation over time.Meanwhile, despite the similar accuracy between faceting and temporal, viewers feel more confident to follow a temporal data-GIF.",
            "icon": "temporal"
        },
        {
            "title": "Preserve context",
            "desc": "Preserving previous data visually supports the comparison and identification of subtle trends. However, inappropriate context preservation may cause visual clutter and bring extra cognition pressure that lowers the understandability. A suggestion is to carefully consider the context preservation design regarding the data features and intention of the GIF.",
            "icon": "trails"
        },
        {
            "title": "Leverage the end frame via a pause",
            "desc": "Viewers generally attach importance to the end frame (e.g., they expect obvious prompts for the end of the repetition and appreciate the pause at the end). Although the online study shows that the pause may not improve the understandability, it does not indicate the uselessness of the end frame. It instead requires a careful design to make pause valuable. An idea to leverage the end frame of a GIF is to subsume important information (e.g., previous data or take-home messages) and make it memorable.",
            "icon": "pause"
        },
        {
            "title": "Incorporate narrative progress",
            "desc": "Integrating the narrative progress design provides the preview and orientation within the GIF. Although the results do not show a significant effect on the understandability of data-GIFs, viewers express the preference of narrative progress that helps the understanding. In addition, elaborate narrative progress can also help present the climax (e.g., showing a significant progress can ignite emotions).",
            "icon": "with"
        },
        {
            "title": "Structure visual content carefully",
            "desc": "Viewers' perception of data-GIFs present a similarity, i.e., guess-first, details on demand. They will guess the meaning of animation at first glance and formulate an understanding of what they have seen, since animation quickly grabs their attention. Then, they will try to examine text and legends. If the initial guess confirms, they are likely to begin an active exploration; otherwise, they will struggle. Thus, a possible suggestion is to shape data-GIFs in a clear structure that supports a rapid reading and understanding.",
            "icon": "structure"
        }
    ]
}

const reducers = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    return newState
}

export default reducers