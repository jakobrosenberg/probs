<script>
    export let count = 0
</script>

<button id='+' on:click={()=>count++}>+</button>
<button id='-' on:click={()=>count--}>-</button>

<h1>count: {count}</h1>