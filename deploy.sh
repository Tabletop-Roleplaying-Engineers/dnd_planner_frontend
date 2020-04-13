ssh -i DnD_KP.pem ubuntu@3.120.235.180 rm -r /home/ubuntu/dnd_planner_frontend/build &&  scp -r -i DnD_KP.pem ./build ubuntu@3.120.235.180:~/dnd_planner_frontend/
