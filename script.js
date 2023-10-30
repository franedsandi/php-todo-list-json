const { createApp } = Vue;

createApp({
  data() {
    return {
      apiUrl: 'server.php',
      title: 'To Do List',
      list: [],
      newTodo: ''
    };
  },
  methods: {
    getList() {
      axios.get(this.apiUrl)
        .then(result => {
          this.list = result.data;
        });
    },
    addTask() {
      const data = new FormData();
      data.append('todoItem', this.newTodo);
      axios.post(this.apiUrl, data)
        .then(result => {
          this.list = result.data;
          this.newTodo = '';
        });
    },
    removeTask(index) {
      const data = new FormData();
      data.append('indexToDelete', index);
      axios.post(this.apiUrl, data)
        .then(result => {
          this.list = result.data;
        });
    },
    toggleTask(index) {
      this.list[index].completed = !this.list[index].completed;
      const data = new FormData();
      data.append('indexToUpdate', index);
      data.append('completed', this.list[index].completed.toString());
      axios.post(this.apiUrl, data)
        .then(result => {
          this.list = result.data;
        });
    }
  },
  mounted() {
    this.getList();
  }
}).mount('#app');