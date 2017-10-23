FROM node:7
MAINTAINER Mumudeveloper
#hardcode
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN yarn global add forever

# Create www directory
RUN mkdir -p /www
COPY ./api /www

# Install www dependencies
WORKDIR /www
RUN yarn install

EXPOSE 9000
# Define default command.  
ENTRYPOINT forever start  -l forever.log -a index.js && tail -f ~/.forever/forever.log
