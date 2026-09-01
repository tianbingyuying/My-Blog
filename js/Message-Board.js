async function comment(name,content){
    const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content }),
    });
    const data = await res.json();
    console.log(data);
}