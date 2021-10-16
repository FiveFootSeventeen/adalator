FROM python:3.10.0a7-buster

RUN apt-get update && apt-get install -y \
    nginx \
    vim

COPY . /app
WORKDIR /app

#COPY server/sencha_stakepool.conf /etc/nginx/sites-enabled/sencha_stakepool.conf

#RUN pip install --upgrade pip setuptools
#RUN pip install --editable ".[testing]"

#RUN service nginx restart
#CMD ["pserve", "development.ini", "--reload"]
CMD ["nginx", "-g", "daemon off;"]
