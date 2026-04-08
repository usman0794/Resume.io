const resumeService = {
  /** Public — home page templates with HTML */
  async getHomePage() {
    await new Promise(r => setTimeout(r, 500));
    return {
      data: {
        templates: [
          { id: '1', name: 'Stockholm', html: '<div class="resume-stockholm">Mock HTML</div>', image_path: 'mock.png' },
          { id: '2', name: 'Sydney', html: '<div class="resume-sydney">Mock HTML</div>', image_path: 'mock.png' }
        ]
      }
    };
  },

  /** Public — single template with HTML */
  async getTemplateById(id: string | number) {
    await new Promise(r => setTimeout(r, 500));
    return {
      data: { id, name: 'Mock Template', html: '<div>Mock HTML</div>', image_path: 'mock.png' }
    };
  },

  /** Public — templates by category tag */
  async getTemplatesByCategory(categoryId: string | number) {
    await new Promise(r => setTimeout(r, 500));
    return {
      data: [
        { id: '1', name: 'Stockholm', html: '<div class="resume-stockholm">Mock HTML</div>', image_path: 'mock.png' }
      ]
    };
  },
};

export default resumeService;
