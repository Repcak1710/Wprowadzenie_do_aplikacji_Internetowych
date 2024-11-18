const apiUrl = 'https://dummyjson.com/products';
let products = [];
let originalOrder = [];

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    products = data.products.slice(0, 30);
    originalOrder = [...products];
    renderTable(products);
  })
  .catch(error => console.error('Error fetching data:', error));

function renderTable(data) {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';

  data.forEach(product => {
    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    imgCell.appendChild(img);

    const titleCell = document.createElement('td');
    titleCell.textContent = product.title;

    const descCell = document.createElement('td');
    descCell.textContent = product.description;

    row.appendChild(imgCell);
    row.appendChild(titleCell);
    row.appendChild(descCell);
    tbody.appendChild(row);
  });
}

document.getElementById('filterInput').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredProducts);
});

document.getElementById('sortSelect').addEventListener('change', (event) => {
  const sortValue = event.target.value;
  let sortedProducts = [...products];

  if (sortValue === 'ascending') {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'descending') {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    sortedProducts = [...originalOrder];
  }

  renderTable(sortedProducts);
});
