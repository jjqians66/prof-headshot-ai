// Prompts from prompt.md - optimized for Google Gemini image-to-image API

export const stylePrompts = {
  corporate: `Transform this photo into a professional corporate headshot with the following characteristics. Maintain the person’s original facial features. Replace casual or random clothing with a well-fitted business suit — navy, charcoal, or black — paired with a crisp white or light blue dress shirt. Add subtle natural lighting from the front, with a softly blurred office or neutral background. Ensure realistic proportions, sharp focus, and flattering skin tones suitable for LinkedIn or corporate profile photos`,
  
  creative: `Transform this photo into a close-up portrait with shallow depth of field creating soft bokeh background. Warm, natural lighting highlighting subject’s features. Casual attire and genuine, engaging smile. Subject fills more of the frame. Background hints at creative workspace or outdoor setting with beautiful blur. Preserve natural skin texture and authentic features. Modern, approachable creative professional aesthetic. Make subject look great and accurate to their original appearance.`,
  
  executive: `TTransform this photo into a dramatic black and white portrait in editorial style. Preserve subject’s authentic features and character. Apply these specifications: monochromatic treatment with rich grayscale tones, deep charcoal or black background with subtle gradation, dramatic side lighting creating strong shadows and highlights on face (Rembrandt or split lighting), preserve all natural skin texture and detail - no smoothing, sharp focus capturing fine details in eyes and facial features, relaxed and contemplative expression - not smiling, casual professional attire (dark textured jacket, no tie), hand gesture near chest or face for dynamic composition, high contrast with deep blacks and bright highlights, cinematic film grain for texture. Maintain editorial photography aesthetic - artistic but professional. Make subject look great and accurate to their original appearance.`
};

export const getPromptForStyle = (style) => {
  return stylePrompts[style] || stylePrompts.corporate;
};

// Style descriptions for reference (from prompt.md)
export const styleDescriptions = {
  corporate: {
    name: 'Corporate Classic',
    overview: 'Traditional business headshot with neutral background, professional attire, and conservative lighting. Ideal for LinkedIn profiles, corporate websites, and business cards.',
    keyElements: [
      'Background: Neutral gray (#B8B8B8 to #E5E5E5) or soft blue-gray',
      'Lighting: Soft, even, frontal (3-point lighting simulation)',
      'Attire: Business formal (suits, blazers, professional shirts)',
      'Expression: Confident yet approachable',
      'Composition: Shoulders up, centered, professional framing',
      'Facial features: Maintain the person\'s original facial features (e.g. face shape, glasses, etc.)'
    ]
  },
  creative: {
    name: 'Creative Professional',
    overview: 'Modern, approachable style with contemporary aesthetic. Perfect for designers, marketers, creative agencies, and tech professionals who want a more relaxed yet still professional look.',
    keyElements: [
      'Background: Soft bokeh with warm tones (beige, soft browns, subtle gradients)',
      'Lighting: Natural, warm, directional (golden hour simulation)',
      'Attire: Business casual (open collars, smart casual, contemporary)',
      'Expression: Friendly, genuine, authentic',
      'Composition: Slight angle, dynamic, modern framing'
    ]
  },
  executive: {
    name: 'Executive Portrait',
    overview: 'High-end, authoritative look with dramatic lighting. Designed for C-suite executives, board members, senior leadership profiles, and premium professional branding.',
    keyElements: [
      'Background: Dark, dramatic (black, deep charcoal #1A1A1A to #2D2D2D)',
      'Lighting: Dramatic, directional, high-contrast (Rembrandt or loop lighting)',
      'Attire: Executive formal (premium suits, sophisticated styling)',
      'Expression: Authoritative, composed, confident',
      'Composition: Power pose, commanding presence, strong framing'
    ]
  }
};

// Technical guidelines from prompt.md
export const technicalGuidelines = {
  imageQuality: {
    resolution: 'High-resolution output (minimum 2048px on longest side)',
    aspectRatio: 'Portrait orientation (3:4 or 4:5)',
    focus: 'Sharp focus on eyes and facial features',
    depthOfField: 'Shallow to medium (face in focus, background blur)'
  },
  preservationRequirements: [
    'Original facial features and structure',
    'Natural skin tones and ethnicity',
    'Eye color and distinctive characteristics',
    'Facial hair (if present and appropriate for style)',
    'Glasses (if present)',
    'Natural appearance without over-processing'
  ],
  processingNotes: [
    'Enhance lighting and color professionally',
    'Remove temporary blemishes while keeping natural skin texture',
    'Ensure appropriate attire for the chosen style',
    'Adjust background to match style guidelines',
    'Maintain photorealistic quality (avoid artificial or illustrated look)',
    'Keep natural proportions and perspective'
  ]
};
