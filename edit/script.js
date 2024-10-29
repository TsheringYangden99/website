// Function for Adding Notices
document.getElementById('addNoticeForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    const title = document.getElementById('noticeTitle').value;
    const details = document.getElementById('noticeDetails').value;
    const imageFile = document.getElementById('noticeImage').files[0]; // Image is optional
    const videoFile = document.getElementById('noticeVideo').files[0]; // Video is optional

    // Create notice object
    const notice = {
        title: title,
        details: details,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        video: videoFile ? URL.createObjectURL(videoFile) : null
    };

    // Retrieve existing notices from localStorage
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.push(notice); // Add new notice to the array
    localStorage.setItem('notices', JSON.stringify(notices)); // Save back to localStorage

    // Clear the form if needed
    document.getElementById('addNoticeForm').reset();

    // Display a message
    document.getElementById('noticeMessage').textContent = 'Notice added successfully!';
});

// Function to display a notice on the page
function displayNotice(notice, index) {
    const noticeSection = document.createElement('div');
    noticeSection.classList.add('notice');

    const noticeTitle = document.createElement('h3');
    noticeTitle.innerText = notice.title;

    const noticeDetails = document.createElement('p');
    noticeDetails.innerText = notice.details;

    if (notice.image) {
        const img = document.createElement('img');
        img.src = notice.image; // Use the URL created earlier
        img.alt = 'Uploaded Image';
        img.style.maxWidth = '100%'; // Ensure image is responsive
        noticeSection.appendChild(img);
    }

    if (notice.video) {
        const video = document.createElement('video');
        video.src = notice.video; // Use the URL created earlier
        video.controls = true;
        noticeSection.appendChild(video);
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        deleteNotice(index); // Call delete function with the notice index
    };

    noticeSection.appendChild(noticeTitle);
    noticeSection.appendChild(noticeDetails);
    noticeSection.appendChild(deleteButton); // Append the delete button

    // Append the notice to the notice list on the view notices page
    document.getElementById('noticeList').appendChild(noticeSection);
}

// Function to delete a notice
function deleteNotice(index) {
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.splice(index, 1); // Remove the notice at the specified index
    localStorage.setItem('notices', JSON.stringify(notices)); // Save the updated array back to localStorage
    loadNotices(); // Reload the notices to refresh the displayed list
}

// Load and display notices on the notice page
function loadNotices() {
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    const noticeList = document.getElementById('noticeList');
    noticeList.innerHTML = ''; // Clear the current list before loading

    notices.forEach((notice, index) => {
        displayNotice(notice, index); // Pass index to displayNotice
    });
}

// Call loadNotices if on the notice page
if (window.location.pathname.includes('notice.html')) {
    loadNotices();
}

