$(document).ready(function () {
    const content = document.querySelector('.content');
    const success = document.querySelector('.success');
    const clientValue = document.querySelector('#clientName');
    const btn = document.querySelector('.btn');

    btn.addEventListener('click', () => {
        const data = {
            name: clientValue.value
        }
        $.ajax({
            url: "http://localhost/getClients.php",
            method: "POST",
            data: data,
            success: (response) => {
                const data = response;
                for(const client of data.clients){
                    const clientElement = document.createElement('div');
                    clientElement.className = "client";
                    for(const field in client){
                       const fieldElem = document.createElement('p');
                       console.log(client[field]);
                       fieldElem.className = field;
                       fieldElem.innerHTML = `<b>${field}</b> : ${client[field]}`;
                       clientElement.appendChild(fieldElem);
                    }
                    const hrElem = document.createElement("hr");
                    success.appendChild(clientElement);
                    success.appendChild(hrElem);
                }

                content.style.display = 'none';
                success.style.display = 'block';
            }
        })
        
    });
});

