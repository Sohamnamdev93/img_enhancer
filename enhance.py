from fastapi.responses import FileResponse
import cv2

def enhance_image(file):

    input_path = "input.jpg"

    with open(input_path, "wb") as f:
        f.write(file.file.read())

    img = cv2.imread(input_path)

    # Noise removal
    img = cv2.fastNlMeansDenoisingColored(
        img,
        None,
        5,
        5,
        7,
        21
    )

    # Mild sharpening
    gaussian = cv2.GaussianBlur(img, (0, 0), 2)

    img = cv2.addWeighted(
        img,
        1.2,
        gaussian,
        -0.2,
        0
    )

    # Soft Glow
    glow = cv2.GaussianBlur(img, (0, 0), 8)

    img = cv2.addWeighted(
        img,
        1.0,
        glow,
        0.15,
        0
    )
    
    

    output = "enhanced.jpg"

    cv2.imwrite(output, img)

    return FileResponse(
        output,
        media_type="image/jpeg"
    )