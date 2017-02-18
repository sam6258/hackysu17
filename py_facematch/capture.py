import cv2

camera_port=0
camera=cv2.VideoCapture(camera_port)
ret,image = camera.read()
filename = "capture.png"
os.system("sudo rm " + filename)
cv2.imwrite(filename, image)