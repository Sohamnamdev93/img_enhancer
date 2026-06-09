from fastapi.responses import FileResponse
import cv2

def aesthetic_image(file):

    path = "input.jpg"

    with open(path, "wb") as f:
        f.write(file.file.read())

    img = cv2.imread(path)

    img = cv2.convertScaleAbs(
        img,
        alpha=1.15,
        beta=10
    )

    output = "aesthetic.jpg"

    cv2.imwrite(output, img)

    return FileResponse(
        output,
        media_type="image/jpeg"
    )