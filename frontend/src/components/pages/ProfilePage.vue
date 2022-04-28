<template>
    <div>
        <AppHeader />
        
      <main>
      <div class="profilePage-div">
        <div class="posts">
          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. <router-link to="editpost"> <span class="material-icons">edit</span> </router-link> <span class="material-icons">delete</span> </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>

           <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fugiat qui, aut perspiciatis dolorem, reiciendis, voluptate excepturi ipsa laborum maxime suscipit inventore nam vitae at vero quisquam corporis nisi soluta!</p>
          </section>
          
         <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>
          
          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>

          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>
          
          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>
          
          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>
          
          <section id="post-example">
          <h3> Lorem ipsum dolor sit amet. </h3>
          <br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloremque suscipit neque vero dolore nobis sapiente corporis beatae animi inventore eligendi reprehenderit sed accusantium at iure mollitia, ex enim quis illum ratione. A corporis asperiores aliquid dolor nisi, minima debitis dolores saepe veritatis laborum, ad suscipit omnis vitae rerum laudantium.</p>
          </section>
          
        </div>

      

        <div class="settings">
          <button>Ändra lösenord</button>
          <button>Ta bort konto</button>
        </div>

      </div>
      </main>

    </div>
</template>

<script>
import AppHeader from "../widgets/AppHeader"

export default {
  name: "ProfilePage",
  components: { AppHeader }
};
</script>

<style scoped>

.profilePage-div{
  width:70%;
  height:80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
}

main{
  display: flex;
  justify-content: center;
  align-items: center;
}

.posts{
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-top:2rem;
}

.settings{
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  border-left: 1px solid black;
  border-right: 1px solid black
}

button{
    padding: 16px 42px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: #FC6E51;
    text-decoration: none;
    color: white;
    font-size: 16px;
    letter-spacing: .08em;
    text-transform: uppercase;
    position: relative;
    transition: background-color .6s ease;
    overflow: hidden;
    cursor: pointer;
    border: none;
  }

  button:hover{
    background: hsl(0, 65%, 64%)
  }

  #post-example {
  width: 80%;
  height: fit-content;
  box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
  line-height: 1.25rem;
  margin-bottom: 3rem;
}

</style>