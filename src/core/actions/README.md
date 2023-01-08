# Actions

Actions are the finest granular level of Orbits.  
An action represents the eventual completion (or failure) of an operation.
It stores its state in a database to be able to retrieve it despite of process failures or network incidents.
Moreover, it has a lock management that guarantees the consistness of the flow.
