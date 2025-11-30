import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('geo_favorites') || '[]') as any[],
    checklist: JSON.parse(localStorage.getItem('geo_checklist') || '[]') as any[],
    user: JSON.parse(localStorage.getItem('geo_user') || 'null') as any
  }),

  actions: {
    login(email: string) {
      this.user = { 
        email: email, 
        name: email.split('@')[0], 
        avatar: 'https://ui-avatars.com/api/?background=0EA5E9&color=fff&name=' + email 
      };
      localStorage.setItem('geo_user', JSON.stringify(this.user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem('geo_user');
      window.location.href = '/login'; 
    },

    toggleFavorite(country: any) {
      const index = this.favorites.findIndex((c: any) => c.cca3 === country.cca3);
      if (index === -1) {
        this.favorites.push(country);
      } else {
        this.favorites.splice(index, 1);
      }
      this.save();
    },

    isFavorite(cca3: string) {
      return this.favorites.some((c: any) => c.cca3 === cca3);
    },

    addTask(text: string) {
      this.checklist.push({ id: Date.now(), text, done: false });
      this.save();
    },

    removeTask(id: number) {
      this.checklist = this.checklist.filter((t: any) => t.id !== id);
      this.save();
    },

    toggleTask(id: number) {
      const task = this.checklist.find((t: any) => t.id === id);
      if (task) task.done = !task.done;
      this.save();
    },

    save() {
      localStorage.setItem('geo_favorites', JSON.stringify(this.favorites));
      localStorage.setItem('geo_checklist', JSON.stringify(this.checklist));
    }
  }
});