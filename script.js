const { createApp } = Vue;

createApp ({
  data(){
    return{
      apiUrl:'server.php',
      title: 'To Do List',
      list:[],
      newTodo: '',
    }
  },
  methods:{
    getlist(){
      axios.get(this.apiUrl)
        .then (result => {
          this.list = result.data;
        })
    },
    addTask(){
      const data = new FormData();
      data.append('todoItem', this.newTodo)
      axios.post(this.apiUrl, data)
      .then(result =>{
        this.list = result.data;
        this.newTodo= '';
      })
    }
  },
   mounted(){
    this.getlist()
   }
}).mount('#app')