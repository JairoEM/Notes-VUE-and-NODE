<template>       
    <div id="footer">
        <div class="bg-dark" id="footerContent">
            <p>Project made by Jairo Eduardo Machado</p>
            <p style="margin:-0.5% 0;">You can see that project and many others on my 
                <a target=”_blank” href="https://github.com/JairoEM">
                    <img src="../assets/logoGithub.svg" height="20px" width="auto" alt="">GitHub
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style>
    #footer{
        height: 80px;
        width: 100%;
        text-align: center;
        color: white;
    }

    #footerContent{
        padding: 35px 0;
        font-size: 0.8em;
    }
</style>