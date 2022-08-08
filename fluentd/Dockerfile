FROM centos:centos7

COPY . /etc/td-agent/

RUN bash /etc/td-agent/install-redhat-td-agent3.sh

EXPOSE 24224
EXPOSE 9999
