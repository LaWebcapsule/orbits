FROM node:16.14.2

#aws cli
COPY --from=amazon/aws-cli /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=amazon/aws-cli /usr/local/bin/ /usr/local/bin/


#aws cdk
RUN npm install -g aws-cdk
RUN npm install -g typescript


CMD [ "node", "--require", "source-map-support/register", "." ]