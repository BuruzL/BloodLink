useEffect(() => {
  fetch("/api/health")
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);
}, []);
