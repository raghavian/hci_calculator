    const t2t = 0.000468515;
    const t2i = 0.00130097;
    const a2t = 0.000633499;
    const t2v = 0.002174218;
    const t3d = 0.002632;
    const t2a = 0.001141833;
    const i2t = 0.000342265;
    const i2i = 0.00088496;
    const i3d = 0.00130097;
    const v2t = 0.000103984;
    const v2v = 0.002601953;
    const a2a = 0.006335;
    const i2v = 0.002601953;
    
        const jobs = [];

        const EU_a2t = [{id: "input-param", label: "Average length of each audio clip sent to the model", type: "number", min: 1, default: 10,_en:a2t},
                        {id: "num-calls", label: "Number of audio clips sent to the system per interaction", type: "number", min: 1, default: 10 },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_i2t = [{id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "num-calls", label: "Number of images input to the system per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_i2i = [{id: "input-param", label: "Image resolution (input)", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2i},                    
                        {id: "img-res", label: "Image resolution (output)", type: "number", min: 32, default: 512, step: 32, max: 4096},                                            
                        {id: "prompt-len", label: "Number of images input to the system per interaction", type: "number", min: 1, default: 10},
                    {id: "num-calls", label: "Number of images generated per interaction", type: "number", min: 1, default: 10 },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_i2v = [{id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2v},                    
                    {id: "num-calls", label: "Length of video generated per interaction in seconds", type: "number", min: 1, default: 10 },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_i3d = [{id: "num-calls", label: "Number of 3D graphics generated per interaction", type: "number", min: 1, default: 10, _en:i3d },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_t2t = [{id: "input-param", label: "Number of words sent to the system (including system prompt)", type: "number", min: 1, default: 10,_en:t2t},
                    {id: "num-prompts", label: "Number of calls to the system per interaction", type: "number", min: 1, default: 50 },                            
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50}];                           
        const EU_t2i = [{id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:t2i},
                        {id: "num-calls", label: "Number of images generated per interaction", type: "number", min: 1, default: 10 },
                  {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_t2a = [{id: "prompt-len", label: "Average length of audio output (in seconds)", type: "number", min: 1, default: 10,_en:t2a},
                    {id: "num-calls", label: "Number of audio clips generated per interaction", type: "number", min: 1, default: 10 },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];        
        const EU_t2v = [{id: "prompt-len", label: "Average length of video output (in seconds)", type: "number", min: 1, default: 10,_en:t2v},
                        {id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096},                    
                    {id: "num-calls", label: "Number of videos generated per interaction", type: "number", min: 1, default: 10 },                        
                    {id: "num-tests", label: "How many users or evaluators did you have?", type: "number", min: 1, default: 50 }];
        const EU_t3d = [{id: "num-calls", label: "Number of 3D graphics generated per interaction", type: "number", min: 1, default: 10, _en:t3d },                        
                    {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 }];

        const DC_t2t = [{id: "input-param", label: "Length of input prompt (number of words)", type: "number", min: 1, default: 10,_en:t2t},
                    {id: "num-prompts", label: "Size of output (number of words)", type: "number", min: 1, default: 50 },                            
                    {id: "num-tests", label: "Number of tests (full dataset generation)", type: "number", min: 1, default: 50}];                           
        const DC_t2i = [{id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:t2i},
                        {id: "num-calls", label: "Number of images generated per interaction", type: "number", min: 1, default: 10 },
                  {id: "num-tests", label: "Number of tests (full dataset generation)", type: "number", min: 1, default: 50 }];
        const DC_t2v = [{id: "prompt-len", label: "Average length of video output (in seconds)", type: "number", min: 1, default: 10,_en:t2v},
                        {id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096},                    
                    {id: "num-calls", label: "Number of videos generated per interaction", type: "number", min: 1, default: 10 }];    

        const TF_t2t = [{id: "input-param", label: "Average length of instances", type: "number", min: 1, default: 10,_en:t2t},
                    {id: "input-param", label: "Number of text instances", type: "number", min: 1, default: 50 },                            
                    {id: "num-tests", label: "Number of epochs", type: "number", min: 1, default: 50}];
        const TF_t2i = [{id: "input-param", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:t2i},
                        {id: "input-param", label: "Number of images instances", type: "number", min: 1, default: 10 },
                        {id: "num-tests", label: "Number of epochs", type: "number", min: 1, default: 50 }];
        const TF_i2t = [{id: "input-param", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "input-param", label: "Number of image instances", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "Number of epochs", type: "number", min: 1, default: 50 }];
        const TF_i2i = [{id: "input-param", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2i},
                        {id: "input-param", label: "Number of image instances", type: "number", min: 1, default: 10 },
                        {id: "num-tests", label: "Number of epochs", type: "number", min: 1, default: 50 }];


        const optionsHierarchy = {
            "research-planning": {
                "literature-review-or-search": {
                    "Text-to-Text": [
                        { id: "num-papers", label: "Number of articles/documents processed", type: "number", min: 1, default: 5, _en: t2t*6000 }
                    ]
                },
                "generation-of-materials-for-user-study": {
                    "Text-to-Text": [
                        { id: "prompt-length", label: "Average length of prompts (in words)", type: "number", min: 1, default: 50, _en : t2t},
                        { id: "num-prompts", label: "Number of prompts", type: "number", min: 1, default: 10 }
                    ], 
                    "Text-to-Image": [
                        { id: "num-images", label: "Number of images generated", type: "number", min: 1, default: 50, _en: t2i},
                        { id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096}
                    ]
                }
            },
            "prototyping-building": {
                "customized-chatbot":{
                    "Text-to-Text": [
                        {id: "input-param", label: "System prompt length (number of words)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Average amount of words per message sent to the chatbot", type: "number", min: 1, default: 10 },                        
                        {id: "num-prompts", label: "How many different system prompts did you try?", type: "number", min: 1, default: 50 },                            
                        {id: "num-tests", label: "How many test messages were sent?", type: "number", min: 1, default: 50},                                                    
                    ],
                },
                "prototype-using-gen-ai-functionality":{
                    "Text-to-Text": [
                        {id: "input-param", label: "Number of words sent to the system (including system prompt)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-calls", label: "Number of calls to the system per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                    
                    ],
                    "Text-to-Image": [
                        {id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "num-calls", label: "Number of images generated per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                                            
                    ],
                    "Audio-to-Text": [
                        {id: "input-param", label: "Average length of audio input in seconds", type: "number", min: 1, default: 10,_en:a2t},
                        {id: "num-calls", label: "Number of audio clips sent to the system per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                    
                    ],
                    "Text-to-Video": [
                        {id: "prompt-len", label: "Average length of video output (in seconds)", type: "number", min: 1, default: 10,_en:t2v},
                        {id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096},                    
                        {id: "num-calls", label: "Number of videos generated per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                        
                    ],
                    "Text-to-3D": [
                        {id: "num-calls", label: "Number of 3D graphics generated per interaction", type: "number", min: 1, default: 10, _en:t3d },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                                            
                    ],
                    "Text-to-Audio":[
                        {id: "prompt-len", label: "Average length of audio output (in seconds)", type: "number", min: 1, default: 10,_en:t2a},
                        {id: "num-calls", label: "Number of audio clips generated per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                                            
                    ],
                    "Image-to-Text":[
                        {id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "num-calls", label: "Number of images input to the system per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                        
                    ],
                    "Image-to-Image":[
                        {id: "input-param", label: "Image resolution (input)", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2i},                    
                        {id: "img-res", label: "Image resolution (output)", type: "number", min: 32, default: 512, step: 32, max: 4096},                                            
                        {id: "prompt-len", label: "Number of images input to the system per interaction", type: "number", min: 1, default: 10},
                        {id: "num-calls", label: "Number of images generated per interaction", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                        
                    ],
                    "Image-to-3D":[
                        {id: "num-calls", label: "Number of 3D graphics generated per interaction", type: "number", min: 1, default: 10, _en:i3d },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                                            
                    
                    ],
                    "Image-to-Video":[
                        {id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2v},                    
                        {id: "num-calls", label: "Length of video generated per interaction in seconds", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "How many times was this feature tested?", type: "number", min: 1, default: 50 },                                                            
                    ],
                },
                "video-prototyping":{
                    "Text-to-Video":[
                        {id: "img-res", label: "Video resolution", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2v},                    
                        {id: "num-calls", label: "Length of video in seconds", type: "number", min: 1, default: 10 },                        
                        {id: "num-tests", label: "Number of videos generated", type: "number", min: 1, default: 50 },                                                            
                    ]
                },
                "generating-graphics-for-prototype":{
                    "Text-to-Image":[
                        {id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "num-calls", label: "Number of images generated", type: "number", min: 1, default: 10 },                        
                    
                    ]
                },
            },
            "evaluation-user-studies": {
                "user-evaluation-of-prototype":{
                    "Audio-to-text": EU_a2t,
                        "Image-to-text": EU_i2t,
                        "Image-to-image": EU_i2i,
                        "Image-to-video": EU_i2v,
                        "Image-to-3D": EU_i3d,
                        "Text-to-text": EU_t2t,
                        "Text-to-image": EU_t2i,
                        "Text-to-audio": EU_t2a,
                        "Text-to-video": EU_t2v,
                        "Text-to-3D": EU_t3d,
                },
                "controlled-user-study":{
                    "Audio-to-text": EU_a2t,
                        "Image-to-text": EU_i2t,
                        "Image-to-image": EU_i2i,
                        "Image-to-video": EU_i2v,
                        "Image-to-3D": EU_i3d,
                        "Text-to-text": EU_t2t,
                        "Text-to-image": EU_t2i,
                        "Text-to-audio": EU_t2a,
                        "Text-to-video": EU_t2v,
                        "Text-to-3D": EU_t3d,
                },
                "open-ended-user-study":{
                    "Audio-to-text": EU_a2t,
                        "Image-to-text": EU_i2t,
                        "Image-to-image": EU_i2i,
                        "Image-to-video": EU_i2v,
                        "Image-to-3D": EU_i3d,
                        "Text-to-text": EU_t2t,
                        "Text-to-image": EU_t2i,
                        "Text-to-audio": EU_t2a,
                        "Text-to-video": EU_t2v,
                        "Text-to-3D": EU_t3d,
                },
                "workshop-or-focus-group":{
                    "Audio-to-text": EU_a2t,
                        "Image-to-text": EU_i2t,
                        "Image-to-image": EU_i2i,
                        "Image-to-video": EU_i2v,
                        "Image-to-3D": EU_i3d,
                        "Text-to-text": EU_t2t,
                        "Text-to-image": EU_t2i,
                        "Text-to-audio": EU_t2a,
                        "Text-to-video": EU_t2v,
                        "Text-to-3D": EU_t3d,
                },
            },
            "data-collection-generation": {
                "automatic-transcription":{
                    "Audio-to-text":[
                        {id: "input-param", label: "Average length of audio files in seconds", type: "number", min: 1, default: 10,_en:a2t},
                        {id: "num-calls", label: "Number of audio files", type: "number", min: 1, default: 10 },                        
                        ],                
                },
                "automatic-translation":{
                    "Text-to-text":[
                        {id: "input-param", label: "Average length of texts (number of words)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Number of texts translated", type: "number", min: 1, default: 10 },                        
                                                ],                
                },
                "dataset-generation":{
                    "Text-to-text": DC_t2t,
                    "Text-to-image": DC_t2i,
                    "Text-to-video": DC_t2v,
                },
                "generation-of-model-output-for-exploration-or-evaluation":{
                    "Text-to-text": DC_t2t,
                    "Text-to-image": DC_t2i,
                    "Text-to-video": DC_t2v,
                }
            },
            "analysis-synthesis": {
                "qualitative-text-analysis":{
                    "Text-to-text":[
                        {id: "input-param", label: "Length of each text segment (in words)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Number of text segments processed", type: "number", min: 1, default: 10 },                        
                        ],                
                },
                "automatic-text-summarization":{
                    "Text-to-text":[
                        {id: "input-param", label: "Length of each text segment (in words)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Number of summaries generated", type: "number", min: 1, default: 10 },                        
                        ],                
                },
                "image-analysis":{
                    "Image-to-text":[
                        {id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:i2t},
                        {id: "num-calls", label: "Number of images processed", type: "number", min: 1, default: 10 },                        
                        ],                
                }
            },
            "dissemination": {
                "manuscript-generation-(text)":{
                    "Text-to-text":[
                        {id: "input-param", label: "Average length of input prompts", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Number of prompts", type: "number", min: 1, default: 10 },                        
                        ],                
                },
                "graphics-generation":{
                    "Text-to-Image":[
                        {id: "img-res", label: "Resolution of images", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:t2i},
                        {id: "num-calls", label: "Number of images generated", type: "number", min: 1, default: 10 },                        
                        ],                
                },
                "proofreading":{
                    "Text-to-text":[
                        {id: "input-param", label: "Length of manuscript (in words)", type: "number", min: 1, default: 10,_en:t2t},
                        {id: "num-words", label: "Number of times proofs have been requested", type: "number", min: 1, default: 10 },                        
                            ],                
                },
                "slides-generation":{
                    "Text-to-image":[
                        {id: "img-res", label: "Resolution of slides", type: "number", min: 32, default: 512, step: 32, max: 4096, _en:t2i},
                        {id: "num-calls", label: "Number of slides generated", type: "number", min: 1, default: 10 },                        
                            ],                
                },
                "audio-presentation-generation":{
                    "Text-to-audio":[
                        {id: "prompt-len", label: "Average length of audio output (in seconds)", type: "number", min: 1, default: 10,_en:t2a},
                        {id: "num-calls", label: "Number of audio clips generated per interaction", type: "number", min: 1, default: 10 },                        
                        ],                
                }
            },
            "training-fine-tuning": {
                "model-training":{
                    "Text-to-text": TF_t2t,
                    "Text-to-image": TF_t2i,
                    "Image-to-text": TF_i2t,
                    "Image-to-image": TF_i2i,
                },
                "model-fine-tuning":{
                    "Text-to-text": TF_t2t,
                    "Text-to-image": TF_t2i,
                    "Image-to-text": TF_i2t,
                    "Image-to-image": TF_i2i,                
                }
            }
        };
