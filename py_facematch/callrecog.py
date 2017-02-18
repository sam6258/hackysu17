from fbrecog import recognize
import sys
path =  sys.argv[1] #Insert your image file path here
access_token = 'EAAaOIWWM4C4BALpixGyrF2UzPasQmYoe8Ly2NTnsLdzRbFZC1leZBUNwInnVXvV6odk3hjbEUIdKYIxhRGCBSqI4Qao1wDhXCI8ZCHqwXKBa1MxMoJ0LR8ndCGUm1G5nh5hqBMMGDAf9EDDhzFZBORCGveZAgMjgZD' #Insert your access token obtained from Graph API explorer here
cookie = 'datr=3-bWVOfBNWzm6NYtXtDN0YR0; sb=1c5UV2INLVvsYmBRDS8Yog-O; pl=y; lu=ThRlvehXI3blt_vytPU5HZTw; c_user=1153095388; xs=38%3ADyjB2M21zpua7g%3A2%3A1481046873%3A18096; csm=2; fr=07papDvN0GMTHnSSY.AWWAjqi-Zt7_wEr8xvKRyF6wnC8.BX1FgH.9d.Fio.0.0.BYqI2M.AWWHimct; act=1487441460106%2F14; p=-2; presence=EDvF3EtimeF1487441477EuserFA21153095388A2EstateFDutF1487441477730CEchFDp_5f1153095388F2CC' #Insert your cookie string here
fb_dtsg = 'AQEYlCW00D76:AQEI2ybD-19W' #Insert the fb_dtsg parameter obtained from Form Data here.
print(recognize(path,access_token,cookie,fb_dtsg))
