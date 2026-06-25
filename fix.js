const fs = require('fs');

const data = [
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\profile\\page.jsx","LineNumber":47,"LineContent":"      const response = await fetch(`http://localhost:5000/volunteer/profile/${userId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\profile\\page.jsx","LineNumber":80,"LineContent":"      const response = await fetch(`http://localhost:5000/volunteer/profile/${userId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\page.jsx","LineNumber":24,"LineContent":"                const donorsRes = await fetch('http://localhost:5000/donors')"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\page.jsx","LineNumber":28,"LineContent":"                const requestsRes = await fetch('http://localhost:5000/volunteer/requests', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\page.jsx","LineNumber":34,"LineContent":"                const donationsRes = await fetch('http://localhost:5000/api/donations')"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\my-requests\\page.jsx","LineNumber":45,"LineContent":"      const response = await fetch(`http://localhost:5000/volunteer/requests/${id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\my-requests\\page.jsx","LineNumber":72,"LineContent":"      const response = await fetch(`http://localhost:5000/volunteer/requests/${editModalData._id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\my-requests\\page.jsx","LineNumber":106,"LineContent":"        const response = await fetch(`http://localhost:5000/volunteer/my-requests/${user.id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\create-request\\page.jsx","LineNumber":65,"LineContent":"      const response = await fetch('http://localhost:5000/volunteer/requests', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\all-blood-donation-request\\page.jsx","LineNumber":47,"LineContent":"      const response = await fetch('http://localhost:5000/volunteer/requests', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\volunteer\\all-blood-donation-request\\page.jsx","LineNumber":75,"LineContent":"      const response = await fetch(`http://localhost:5000/volunteer/update-status/${requestId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\search\\page.jsx","LineNumber":28,"LineContent":"      const res = await fetch(`http://localhost:5000/donors?${params.toString()}`)"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\requests\\page.jsx","LineNumber":50,"LineContent":"        const res = await fetch(\"http://localhost:5000/requests\")"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\page.jsx","LineNumber":7,"LineContent":"    const res = await fetch(\"http://localhost:5000/requests\", { cache: \"no-store\" });"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\funding\\success\\page.jsx","LineNumber":24,"LineContent":"        const res = await fetch(\"http://localhost:5000/api/donations/confirm\", {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\funding\\page.jsx","LineNumber":35,"LineContent":"        const res = await fetch(\"http://localhost:5000/api/donations\")"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\funding\\page.jsx","LineNumber":71,"LineContent":"      const res = await fetch(\"http://localhost:5000/create-checkout-session\", {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\profile\\page.jsx","LineNumber":46,"LineContent":"      const response = await fetch(`http://localhost:5000/donor/profile/${userId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\profile\\page.jsx","LineNumber":79,"LineContent":"      const response = await fetch(`http://localhost:5000/donor/profile/${userId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\page.jsx","LineNumber":27,"LineContent":"        const globalRes = await fetch(`http://localhost:5000/requests`);"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\page.jsx","LineNumber":34,"LineContent":"        const donationsRes = await fetch('http://localhost:5000/api/donations')"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\page.jsx","LineNumber":44,"LineContent":"          const personalRes = await fetch(`http://localhost:5000/donor/my-requests/${user.id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\my-requests\\page.jsx","LineNumber":35,"LineContent":"      const response = await fetch(`http://localhost:5000/donor/requests/${id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\my-requests\\page.jsx","LineNumber":62,"LineContent":"      const response = await fetch(`http://localhost:5000/donor/requests/${editModalData._id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\my-requests\\page.jsx","LineNumber":96,"LineContent":"        const response = await fetch(`http://localhost:5000/donor/my-requests/${user.id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\donor\\create-request\\page.jsx","LineNumber":65,"LineContent":"      const response = await fetch('http://localhost:5000/donor/requests', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\users\\page.jsx","LineNumber":29,"LineContent":"        const response = await fetch('http://localhost:5000/admin/users', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\users\\page.jsx","LineNumber":53,"LineContent":"      const response = await fetch(`http://localhost:5000/admin/users/${id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\users\\page.jsx","LineNumber":76,"LineContent":"      const response = await fetch(`http://localhost:5000/admin/users/${editModalData._id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\requests\\page.jsx","LineNumber":33,"LineContent":"      const response = await fetch(`http://localhost:5000/admin/requests/${deleteModalData._id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\requests\\page.jsx","LineNumber":57,"LineContent":"      const response = await fetch(`http://localhost:5000/admin/requests/${editModalData._id}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\requests\\page.jsx","LineNumber":91,"LineContent":"        const response = await fetch('http://localhost:5000/admin/requests', {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\requests\\page.jsx","LineNumber":112,"LineContent":"      const response = await fetch(`http://localhost:5000/admin/requests/${requestId}`, {"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\page.jsx","LineNumber":23,"LineContent":"          fetch('http://localhost:5000/admin/requests', { headers }),"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\page.jsx","LineNumber":24,"LineContent":"          fetch('http://localhost:5000/admin/users', { headers }),"},
  {"File":"d:\\LifeFlow-Client\\src\\app\\admin\\page.jsx","LineNumber":25,"LineContent":"          fetch('http://localhost:5000/api/donations')"}
];

const fileChanges = {};
for (const item of data) {
    if (!fileChanges[item.File]) {
        fileChanges[item.File] = [];
    }
    fileChanges[item.File].push(item);
}

for (const file in fileChanges) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    for (const item of fileChanges[file]) {
        const lineIdx = item.LineNumber - 1;
        
        let original = item.LineContent;
        original = original.replace(/'http:\/\/localhost:5000([^']*)'/g, '\`${process.env.NEXT_PUBLIC_API_URL}$1\`');
        original = original.replace(/\"http:\/\/localhost:5000([^\"]*)\"/g, '\`${process.env.NEXT_PUBLIC_API_URL}$1\`');
        original = original.replace(/\`http:\/\/localhost:5000([^\`]*)\`/g, '\`${process.env.NEXT_PUBLIC_API_URL}$1\`');
        
        lines[lineIdx] = original;
    }
    // write back with crlf
    fs.writeFileSync(file, lines.join('\r\n'), 'utf8');
    console.log("Fixed " + file);
}
