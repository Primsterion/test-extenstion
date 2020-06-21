$(document).ready(function () {
    const content = document.querySelector('.content');
    const success = document.querySelector('.success');
    const error = document.querySelector('.error');
    const notFoud = document.querySelector('.not_found');
    const clientValue = document.querySelector('#clientName');
    const btnSearch = document.querySelector('.btn-search');
    const loadElem = document.querySelector('.loading');

    btnSearch.addEventListener('click', () => {
        const data = {
            name: clientValue.value
        }
        $.ajax({
            url: "http://localhost/getClients.php",
            method: "POST",
            data: data,
            beforeSend: () => {
                content.style.display = 'none';
                loadElem.style.display = 'flex';
            },
            success: (response) => {
                loadElem.style.display = 'none';
                const data = response;
                success.querySelector('.clients').innerHTML = "";
                if(!data.error && data.clients.length > 0){
                    for(const client of data.clients){
                        const clientElement = document.createElement('div');
                        clientElement.className = "client";
                        for(const field in client){
                            const fieldElem = document.createElement('p');
                            fieldElem.className = field;
                            fieldElem.innerHTML = `<b>${field}</b> : ${client[field]}`;
                            clientElement.appendChild(fieldElem);
                        }
                        const hrElem = document.createElement("hr");
                        success.querySelector('.clients').appendChild(clientElement);
                        success.querySelector('.clients').appendChild(hrElem);
                    }
                    content.style.display = 'none';
                    notFoud.style.display = 'none';
                    success.style.display = 'block';
                }else{
                    if(data.clients.length === 0){
                        content.style.display = 'none';
                        success.style.display = 'block';
                        notFoud.style.display = 'block';
                    }
                }
            },
            error: () => {
                loadElem.style.display = 'none';
                content.style.display = 'none';
                error.style.display = 'block';
            }
        })
        
    });

    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-reset')){
            content.style.display = 'block';
            success.style.display = 'none';
            error.style.display = 'none';
            notFoud.style.display = 'none';
        }
    });
});

