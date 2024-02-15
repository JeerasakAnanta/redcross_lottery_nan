<!DOCTYPE html>
<html>

<head>
    <!-- Add your existing head content here -->
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <script type="module" src="Assets/script/index.js"></script>
</head>

<body>
    <!-- Your existing HTML content here -->

    <form id="uploadForm" action="http://203.158.173.23:3000/api/upload" method="post" enctype="multipart/form-data">
        <div class="button-group">
            <button id="btnStream" type="button" class="button"><span><i class='bx bxs-camera' style='color:rgb(7, 18, 63)'></i> Capture Image</span></button>
        </div>

        <video id="stream" width="100%" height="450"></video>
        <canvas id="canvas" style="display: none;" width="600" height="450"></canvas>

        <!-- Hidden input to store base64-encoded image data -->
        <input type="hidden" id="imageData" name="imageData" value="">

        <!-- Display the captured image -->
        <img id="capturedImage" style="display: none;" width="100%">
        <input type="file" name="image" id="image">


        <input type="submit" value="Upload Image" name="submit">
    </form>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('stream');
            const canvas = document.getElementById('canvas');
            const btnStream = document.getElementById('btnStream');
            const imageDataInput = document.getElementById('imageData');
            const capturedImage = document.getElementById('capturedImage');
            const uploadForm = document.getElementById('uploadForm');

            async function startCamera() {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true
                    });
                    video.srcObject = stream;
                    video.play();
                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
            }

            btnStream.addEventListener('click', function() {
                startCamera();
                captureImage();
            });

            function captureImage() {
                const context = canvas.getContext('2d');
                canvas.style.display = 'block';
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert the canvas image to base64 format
                const base64ImageData = canvas.toDataURL('image/png');

                // Set the base64-encoded image data in the hidden input field
                imageDataInput.value = base64ImageData;

                // Show the captured image
                capturedImage.src = base64ImageData;
                capturedImage.style.display = 'block';
            }

            // Prevent the form from being submitted immediately
            uploadForm.addEventListener('submit', function(event) {
                event.preventDefault();
                // Add additional logic if needed before submitting the form
                // You can use the FormData API to submit the form with the image data
                // For example:
                // const formData = new FormData(uploadForm);
                // fetch('http://203.158.173.23:3000/api/upload', { method: 'POST', body: formData })
                //   .then(response => response.json())
                //   .then(data => console.log(data))
                //   .catch(error => console.error('Error:', error));
            });
        });
    </script>

    <!-- Your existing HTML content here -->

</body>

</html>