FROM oven/bun:1-debian

ARG USERNAME=bun

RUN usermod -s /bin/bash $USERNAME \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME

# Install dev utilities
RUN sudo apt-get update \
    && sudo apt-get install -y git
