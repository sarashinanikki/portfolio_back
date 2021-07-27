FROM node:16

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN mkdir ~/.aws
RUN npm install -g serverless

WORKDIR /app
COPY . /app/

RUN cp credentials ~/.aws