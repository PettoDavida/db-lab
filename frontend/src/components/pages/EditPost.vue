    

<script>

import AppHeader from "../widgets/AppHeader"

export default {
    name: "EditPost",    
    components: { AppHeader }
}

</script>
    <template>
        <div class="createPostContainer">
            <AppHeader />

        <div class="mainDiv">
            
            <div class="postForm">
                <div class="postFormHeader">
                    <h2>Redigera inlägg</h2>
                </div>

            <label for=""> Titel:
                <input type="text">
            </label>
        
            <label for="body-text"> Brödtext:
                <textarea name="body-text" id="" cols="60" rows="10"></textarea>
            </label>

            <button>Redigera inlägg</button>
        </div>
        </div>
        </div>
    </template>

<style scoped>

.createPostContainer{
    width: 100%;
    height: 100%;
}

.mainDiv{
    height: 85vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.postForm{
    width: 50%;
    height: 70%;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.postFormHeader{
    height:10vh;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;   
    width:100%;
}

textarea {
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;

}

input{
    width: 15vw;
}

label, input, textarea{
    display: block;
    font-size: 1rem;
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

</style>