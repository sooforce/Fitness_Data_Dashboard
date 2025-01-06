document.getElementById('fitnessForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const activity = document.getElementById('activity').value;
    const repeats = document.getElementById('repeats').value;
    const sets = document.getElementById('sets').value;

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            activity: activity,
            repeats: repeats,
            sets: sets
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Data added successfully') {
            loadData();
        }
    });
});

document.getElementById('deleteButton').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.value);

    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ids }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Entries deleted successfully') {
            loadData();
        }
    });
});

document.getElementById('categorizeButton').addEventListener('click', function() {
    const categoryName = document.getElementById('categoryName').value;
    const checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.value);

    fetch('/categorize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: ids,
            category: categoryName
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Entries categorized successfully') {
            loadData();
        }
    });
});

document.getElementById('editButton').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (ids.length !== 1) {
        alert('Please select exactly one entry to edit.');
        return;
    }

    const id = ids[0];
    fetch(`/data/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('date').value = data.date;
            document.getElementById('activity').value = data.activity;
            document.getElementById('repeats').value = data.repeats;
            document.getElementById('sets').value = data.sets;
            document.getElementById('editButton').dataset.id = id;
        });
});

document.getElementById('fitnessForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('editButton').dataset.id;
    const date = document.getElementById('date').value;
    const activity = document.getElementById('activity').value;
    const repeats = document.getElementById('repeats').value;
    const sets = document.getElementById('sets').value;

    const url = id ? `/edit/${id}` : '/add';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            activity: activity,
            repeats: repeats,
            sets: sets
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Data added successfully' || data.message === 'Data updated successfully') {
            loadData();
            document.getElementById('fitnessForm').reset();
            delete document.getElementById('editButton').dataset.id;
        }
    });
});

function loadData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            data.forEach(entry => {
                const row = tableBody.insertRow();
                const cell0 = row.insertCell(0);
                const cell1 = row.insertCell(1);
                const cell2 = row.insertCell(2);
                const cell3 = row.insertCell(3);
                const cell4 = row.insertCell(4);
                const cell5 = row.insertCell(5);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = entry.id;
                cell0.appendChild(checkbox);

                cell1.innerHTML = entry.date;
                cell2.innerHTML = entry.activity;
                cell3.innerHTML = entry.sets;
                cell4.innerHTML = entry.repeats;
                cell5.innerHTML = entry.category ? entry.category : '';
            });
        });
}

function sortTable(n) {
    const table = document.getElementById("dataTable");
    let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

window.onload = loadData;
