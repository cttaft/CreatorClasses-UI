import { CreatorClass } from "../../types/CreatorClass";

class SubscriptionService{

    async getSubscriptions(token : string) : Promise<CreatorClass[]>{
        
        const res = await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions`,
        {
          headers: {
            method: 'GET',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }).then(data =>  data.json()).catch(err => []);
        console.log(res);
        return res;
    
    }

    async unsubscribe(classId :string, token: string) : Promise<CreatorClass[]>{
      await fetch(`https://creator-classes-experience-api.azurewebsites.net/subscriptions/${classId}`,
      {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
      });

      return await this.getSubscriptions(token);
    }
}

export default SubscriptionService;