(function () {
    const container = document.getElementById('detail-rows');
    const addButton = document.getElementById('add-detail-row');
    if (!container || !addButton) {
        return;
    }

     const template = container.querySelector('.detail-row')?.cloneNode(true);

    addButton.addEventListener('click', function () {
        const clone = template.cloneNode(true);

        if (!template) {
            return;
        }

        clone.querySelectorAll('input, select, textarea').forEach(function (input) {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else {
                input.value = '';
            }
        });
        container.appendChild(clone);
        reindexRows();
    });

    container.addEventListener('click', function (event) {
        const button = event.target.closest('.remove-detail-row');
        if (!button) {
            return;
        }
        const rows = container.querySelectorAll('.detail-row');
        if (rows.length < 1) {
            return;
        }
        button.closest('.detail-row').remove();
        reindexRows();
    });

    function reindexRows() {
        container.querySelectorAll('.detail-row').forEach(function (row, index) {
            row.querySelectorAll('[name]').forEach(function (input) {
                input.name = input.name.replace(/details\[\d+]/, 'details[' + index + ']');
            });
        });
    }
})();
